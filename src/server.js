import 'newrelic'
import http from 'http'
import express from 'express'
import winston from 'winston'
import expressWinston from 'express-winston'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import hpp from 'hpp'
import throng from 'throng'
import Raven from 'raven'
import dotenv from 'dotenv'
import path from 'path'
import aws from 'aws-sdk'
import pg from 'pg'
import EventEmitter from 'events'

dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const DefaultServerConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  timeout: 28000,
  schemaName: process.env.SCHEMA_NAME,
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres@localhost/vivos-em-nos-pwa',
  sentryDns: process.env.SENTRY_DSN,
  s3BucketName: process.env.AWS_BUCKET || 'vivo-em-nos-staging',
}

const createMemoriesListener = (config, emailEmitter) => {
  const client = new pg.Client(config.databaseUrl)

  return client.connect((err) => {
    if (err) throw err

    client.on('notification', (msg) => {
      emailEmitter.emit('memory_created', msg)
    })

    client.query('LISTEN new_memories')

    return client
    // client.end(function (err) {
    //   if (err) throw err;
    // });
  })
}

const createServer = (config) => {
  const PROD = config.nodeEnv === 'production'
  const app = express()

  if (PROD) {
    Raven.config(config.sentryDns).install()
    app.use(Raven.requestHandler())
  }

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({ colorize: true }),
    ],
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true,
  }))
  app.use(cors())
  app.use(helmet())
  app.use(hpp())
  app.use(compression())

  app.use(express.static(path.resolve(__dirname, '..', 'dist')))

  app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: `${config.s3BucketName}`,
    uniquePrefix: false,
    ACL: 'public-read'
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
  })

  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({ colorize: true }),
    ],
  }))

  if (PROD) { app.use(Raven.errorHandler()) }

  const server = http.createServer(app)

  // Heroku dynos automatically timeout after 30s. Set our
  // own timeout here to force sockets to close before that.
  // https://devcenter.heroku.com/articles/request-timeout
  if (config.timeout) {
    server.setTimeout(config.timeout, (socket) => {
      const message = `Timeout of ${config.timeout}ms exceeded`

      socket.end([
        'HTTP/1.1 503 Service Unavailable',
        `Date: ${(new Date).toGMTString()}`,  // eslint-disable-line
        'Content-Type: text/plain',
        `Content-Length: ${message.length}`,
        'Connection: close',
        '',
        message,
      ].join('\r\n'))
    })
  }

  return server
}

class EmailEmitter extends EventEmitter {}

const startServer = (serverConfig) => {
  const config = { ...DefaultServerConfig, ...serverConfig }
  const server = createServer(config)

  const emailEmitter = new EmailEmitter()
  createMemoriesListener(config, emailEmitter)

  emailEmitter.on('memory_created', (msg) => {
    winston.info(msg)
  })

  server.listen(config.port, (err) => {
    if (err) winston.log(err)
    winston.info(`server ${config.id} listening on port ${config.port}`)
  })
}

if (require.main === module) {
  throng({
    start: id => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity,
  })
}

export default createServer

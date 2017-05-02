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
import WinstonCloudwatch from 'winston-cloudwatch'
import EventEmitter from 'events'
import path from 'path'
import log from './log'
import mailer from './mailer'
import ping from './ping'

class EmailEmitter extends EventEmitter {}

const envFile = { path: path.resolve(__dirname, '..', '.env') }
dotenv.config(envFile)

const DefaultServerConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  timeout: 28000,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'xxx',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'yyy',
  schemaName: process.env.SCHEMA_NAME,
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres@localhost/vivos-em-nos-pwa',
  sentryDns: process.env.SENTRY_DSN,
  s3BucketName: process.env.AWS_BUCKET || 'vivo-em-nos-staging',
  startTime: -1,
  emailEmitter: new EmailEmitter(),
}

const createServer = (config, winstonLog) => {
  const PROD = config.nodeEnv === 'production'
  const app = express()

  if (PROD) {
    winstonLog.info(envFile, process.env)
    winstonLog.info(`sentry carregado ${config.sentryDns}`)
    Raven.config(config.sentryDns).install()
    app.use(Raven.requestHandler())
  }

  // app.use(expressWinston.logger({
  //   transports: [log.expressServerTransports(config)],
  //   msg: 'HTTP {{req.method}} {{req.url}}',
  //   expressFormat: true,
  //   colorize: !PROD,
  // }))

  app.use(cors())
  app.use(helmet())
  app.use(hpp())
  app.use(compression())
  const staticPath = path.resolve(__dirname, '..', '..', 'dist')
  app.use(express.static(staticPath))

  app.use('/ping', function (req, res) {
    ping.checkPostgres(config, winstonLog, res)
  })

  app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: `${config.s3BucketName}`,
    uniquePrefix: false,
    ACL: 'public-read',
    s3Options: {
      accessKeyId: config.accessKeyId,
      secretKeyId: config.secretKeyId,
    },
  }))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'))
    res.end()
  })

  app.use(expressWinston.errorLogger({
    transports: [log.expressServerTransports(config)]
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

const startServer = (serverConfig) => {
  const config = { ...DefaultServerConfig, ...serverConfig }

  winston.loggers.add('app-log', {
    transports: [log.appLogTransports(config)]
  })
  const winstonLog = winston.loggers.get('app-log')
  const server = createServer(config, winstonLog)

  server.listen(config.port, (err) => {
    if (err) {
      winstonLog.error(err)
      throw err
    }
    winstonLog.info(`server ${config.id} listening on port ${config.port}`)

    mailer.createMemoriesListener(config, winstonLog)
  })
}

export {
  createServer,
  log,
  mailer,
  ping
}

if (require.main === module) {
  throng({
    start: id => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity,
  })
}

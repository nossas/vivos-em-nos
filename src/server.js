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
import _ from 'lodash'
import fs from 'fs'
import os from 'os'
import crypto from 'crypto'
import WinstonCloudwatch from 'winston-cloudwatch'
import { URL } from 'url'

dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const startTime = new Date().toISOString()

const winstonTransport = ({ nodeEnv, accessKeyId, secretAccessKey }) => {
  if (nodeEnv === 'production') {
    return new WinstonCloudwatch({
      accessKeyId,
      secretAccessKey,
      logGroupName: 'vivos-em-nos-production',
      logStreamName: () => {
        // Spread log streams across dates as the server stays up
        let date = new Date().toISOString().split('T')[0];
        return 'express-server-' + date + '-' +
          crypto.createHash('md5')
          .update(startTime)
          .digest('hex');
      },
      awsRegion: 'us-west-1',
      jsonMessage: true,
    })
  }
  return new winston.transports.Console({ colorize: true })
}

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
}

class EmailEmitter extends EventEmitter {}

const createMemoriesListener = (pool, emailEmitter) =>
  pool.connect(function(err, client, done) {
    if (err) {
      return winston.error('error fetching client from pool', err)
    }
    client.on('notification', function (msg) {
      winston.info(`MEMORY CREATED: ${JSON.stringify(msg)}`)
      emailEmitter.emit('memory_created', msg)
    })
    client.query('LISTEN new_memories')
    done()
  })

// https://github.com/FastIT/health-check
const checkPostgres = (client, res) => {
  client.query('SELECT NOW() AS "the_time"', function (err, resDb) {
    if (err) {
      return res.json({ status: 'ko', online: false, error: err })
    }

    return res.json({
      online: true,
      os: {
        arch: os.arch(),
        loadavg: os.loadavg(),
        freemem: os.freemem(),
        platform: os.platform(),
        totalmem: os.totalmem(),
        uptime: os.uptime(),
        release: os.release(),
      },
      resDb,
      process: {
        execArgv: process.execArgv,
        execPath: process.execPath,
        memoryUsage: process.memoryUsage(),
        pid: process.pid,
        platform: process.platform,
        uptime: process.uptime(),
      },
      uptime: process.uptime(),
      status: 'ok',
    })
  })
}

const createServer = (client, config) => {
  const PROD = config.nodeEnv === 'production'
  const app = express()

  if (PROD) {
    Raven.config(config.sentryDns).install()
    app.use(Raven.requestHandler())
  }

  app.use(expressWinston.logger({
    transports: [winstonTransport(config)],
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: !PROD,
  }))
  app.use(cors())
  app.use(helmet())
  app.use(hpp())
  app.use(compression())

  app.use(express.static(path.resolve(__dirname, '..', 'dist')))

  app.use('/ping', (req, res) => checkPostgres(client, res))

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
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
  })

  app.use(expressWinston.errorLogger({
    transports: [winstonTransport(config)],
  }))

  if (PROD) { app.use(Raven.errorHandler()) }

  const server = http.createServer(app)

  // Heroku dynos automatically timeout after 30s. Set our
  // own timeout here to force sockets to close before that.
  // https://devcenter.heroku.com/articles/request-timeout
  if (config.timeout) {
    server.setTimeout(config.timeout, (socket) => {
      const message = `Timeout of ${config.timeout}ms exceeded`
      // winston.error(message)
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
  const emailEmitter = new EmailEmitter()

  const myDb = new URL(config.databaseUrl)

  const pool = new pg.Pool({
    user: myDb.username,
    database: myDb.pathname.substr(1),
    password: myDb.password,
    host: myDb.hostname,
    port: myDb.port,
    max: 10,
    idleTimeoutMillis: 30000,
  })

  pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    winston.error('idle client error', err.message, err.stack)
  })


  const server = createServer(pool, config)

  createMemoriesListener(pool, emailEmitter)

  emailEmitter.on('memory_created', ({ payload }) => {
    let EmailTemplate
    const p = JSON.parse(payload)
    const fileNameEmailTemplate = path.resolve(__dirname, 'static',
      'template-email-edicao-memoria.html')

    fs.readFile(fileNameEmailTemplate, 'utf8', (err, fileContent) => {
      if (err) throw err
      const data = fileContent.toString()
      EmailTemplate = _.template(data)

      const ses = new aws.SES({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        region: 'us-west-2',
      })
      const eparam = {
        Destination: {
          ToAddresses: [`${p.owner_first_name}<${p.owner_email}>`],
        },
        Message: {
          Body: {
            Html: {
              Data: EmailTemplate(p),
            },
            Text: {
              Data: `Olá ${data.owner_first_name}!

Sua homenagem criada no #VivoEmNos está pronta. Caso tenha visto algo que não goste, você pode editar copiando e colando no navegador o link abaixo.

https://vivosemnos.org/memory/edit?token=${data.token}

Saudações,
Equipe Vivo Em Nós

Este email foi enviado porque foi criada uma homenagem no site www.vivosemnos.org. Se não foi você, desconsidere esse e-mail.

Caso esse email te incomode, fique à vontade para enviar um email para notificacoes@vivosemnos.org e pedir o cancelamento.

Brazil - Rio De Janeiro, RJ - Botafogo - Rua Visconde Silva, 21 - 22271-043`,
            },
          },
          Subject: {
            Data: 'Sua homenagem ficou pronta, acesse!',
          },
        },
        Source: 'Vivos Em Nós <notificacoes@vivosemnos.org>',
        ReplyToAddresses: ['Vivos Em Nós <notificacoes@vivosemnos.org>'],
        ReturnPath: 'Vivos Em Nós <notificacoes@vivosemnos.org>',
      }

      ses.sendEmail(eparam, function (err, data) {
        if (err) {
          winston.error(err)
          throw (err)
        } else {
          winston.info(data)
        }
      })
    })
  })

  server.listen(config.port, (err) => {
    if (err) {
      winston.error(err)
      throw err
    }
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

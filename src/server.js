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

dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

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
    //   if (err) throw err
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

const startServer = (serverConfig) => {
  const config = { ...DefaultServerConfig, ...serverConfig }
  const server = createServer(config)

  const emailEmitter = new EmailEmitter()
  createMemoriesListener(config, emailEmitter)

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

https://vivosemnos.org/homenagem/editar?token=${data.token}

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
          throw (err)
        } else {
          winston.info(data)
        }
      })
    })
  })

  server.listen(config.port, (err) => {
    if (err) throw err
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

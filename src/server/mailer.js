import { URL } from 'url'
import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import aws from 'aws-sdk'
import pg from 'pg'

const createMemoriesListener = (config, winstonLog) => {
  const client = new pg.Client(config.databaseUrl)
  client.connect(function(err, client) {
    if (err) {
      return winstonLog.error('error fetching client from client', err)
    }
    winstonLog.info('Opened exclusive connection')

    config.emailEmitter.on('memory_created', function ({ payload }) {
      const p = JSON.parse(payload)
      const fileNameEmailTemplate = path.resolve(__dirname,
        'notification-criacao-memoria.html')

      fs.readFile(fileNameEmailTemplate, 'utf8', function (err, fileContent) {
        if (err) {
          winstonLog.error(err)
          throw err
        }
        const data = fileContent.toString()
        const EmailHtml = _.template(data)
        const EmailText = `Olá ${p.owner_first_name}!

  Sua homenagem criada no #VivoEmNos está pronta. Caso tenha visto algo que não goste, você pode editar copiando e colando no navegador o link abaixo.

  https://vivosemnos.org/memory/edit?token=${p.token}

  Saudações,
  Equipe Vivo Em Nós

  Este email foi enviado porque foi criada uma homenagem no site www.vivosemnos.org. Se não foi você, desconsidere esse e-mail.

  Caso esse email te incomode, fique à vontade para enviar um email para notificacoes@vivosemnos.org e pedir o cancelamento.
`

        const ses = new aws.SES({
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
          region: 'us-west-2',
        })

        winstonLog.info(`MEMORY READY TO MAIL: ${EmailText}`)

        const eparam = {
          Destination: {
            ToAddresses: [`${p.owner_first_name}<${p.owner_email}>`],
          },
          Message: {
            Body: {
              Html: {
                Data: EmailHtml(p),
              },
              Text: {
                Data: EmailText,
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
            winstonLog.error(err)
            throw (err)
          } else {
            winstonLog.info(data)
          }
        })
      })
    })

    client.on('notification', function (msg) {
      winstonLog.info(`MEMORY CREATED: ${JSON.stringify(msg)}`)
      config.emailEmitter.emit('memory_created', msg)
    })
    client.query('LISTEN new_memories')

    return client
  })
}

export default {
  createMemoriesListener,
}

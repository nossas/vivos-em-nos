import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import aws from 'aws-sdk'
import pg from 'pg'
import mimelib from 'mimelib'

function sendMail(payload, config, winstonLog) {
  const p = JSON.parse(payload)
  const fileNameEmailTemplate = path.resolve(
    __dirname, '..', '..', 'dist',
    p.language === 'es'
      ? 'notification-memory-create.es.html'
      : 'notification-memory-create.pt.html',
  )

  fs.readFile(fileNameEmailTemplate, 'utf8', function (err, fileContent) {
    if (err) {
      winstonLog.error(err)
      throw err
    }
    const data = fileContent.toString()
    const EmailHtml = _.template(data)
    const EmailText = '' // notification message injection. make it work.

    const ses = new aws.SES({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: 'us-west-2',
    })

    winstonLog.info(`MEMORY READY TO MAIL: ${EmailText}`)

    const replyTo = p.language === 'es'
      ? `${mimelib.encodeMimeWord('Vivos En Nosotros')} <contato@vivosennosotros.org>`
      : `${mimelib.encodeMimeWord('Vivos Em Nós')} <contato@vivosemnos.org>`

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
          Data: p.language === 'es'
            ? 'Su homenaje quedó lista, acceda!'
            : 'Sua homenagem ficou pronta, acesse!',
        },
      },
      Source: replyTo,
      ReplyToAddresses: [replyTo],
      ReturnPath: replyTo,
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
}

const createMemoriesListener = function(config, winstonLog) {
  const client = new pg.Client(config.databaseUrl)
  client.connect(function(err, client) {
    if (err) {
      return winstonLog.error('error fetching client from client', err)
    }
    winstonLog.info('Opened exclusive connection')

    client.on('notification', function (msg) {
      winstonLog.info(`MEMORY CREATED: ${JSON.stringify(msg)}`)
      sendMail(msg.payload, config, winstonLog)
    })
    client.query('LISTEN new_memories')

    return client
  })
}

export default {
  createMemoriesListener,
}

// import crypto from 'crypto'
// import expressWinston from 'express-winston'
import winston from 'winston'
import WinstonCloudwatch from 'winston-cloudwatch'
import crypto from 'crypto'

const appLogTransports = config => {
  return winstonTransport({
    ...config,
    logStreamName: winstonLogName('app-log', config.startTime),
  })
}

const expressServerTransports = config => {
  return winstonTransport({
    ...config,
    logStreamName: winstonLogName('express-server', config.startTime)
  })
}

const winstonLogName = function (name, startTime) {
  // Spread log streams across dates as the server stays up
  const date = new Date().toISOString().split('T')[0]

  const rnd = crypto.createHash('md5')
                    .update(startTime)
                    .digest('hex')
  return `${name}-${date}-${rnd}`
}

const winstonTransport = ({ nodeEnv, accessKeyId, secretAccessKey, logStreamName }) => {
  if (nodeEnv === 'production') {
    return new WinstonCloudwatch({
      accessKeyId,
      secretAccessKey,
      logGroupName: 'vivos-em-nos-production',
      logStreamName,
      awsRegion: 'us-west-1',
      jsonMessage: true,
      ignoredRoutes: ['ping'],
    })
  }
  return new winston.transports.Console({ colorize: true })
}
export default {
  winstonLogName,
  winstonTransport,
  expressServerTransports,
  appLogTransports
}

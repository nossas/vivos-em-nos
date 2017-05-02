import os from 'os'
import pg from 'pg'
import { URL } from 'url'

const createPoolConnections = function (config, log) {
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

  pool.on('error', function (err) {
    log.error('idle pool error', err.message, err.stack)
  })

  log.info('Opened pool connection')
  return pool
}

// https://github.com/FastIT/health-check
const checkPostgres = function (config, log, res) {
  const pool = createPoolConnections(config, log)

  pool.query('SELECT NOW() AS "the_time"', function (err, resDb) {
    if (err) {
      log.info(err)
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

export default {
  createPoolConnections,
  checkPostgres
}

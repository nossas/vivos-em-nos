import test from 'ava'
import request from 'supertest'
import { exec } from 'mz/child_process'
import * as server from './dist/server/index'


const serverConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  timeout: 28000,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'xxx',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'yyy',
  schemaName: process.env.SCHEMA_NAME,
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres@localhost/vivos-em-nos-pwa',
  sentryDns: process.env.SENTRY_DSN,
  s3BucketName: process.env.AWS_BUCKET || 'vivo-em-nos-staging',
  startTime: new Date().toISOString(),
}

test.skip('build application', async (t) => {
  t.plan(1)
  const build = exec('yarn run build')
  const b = await build
  t.truthy(b.join().indexOf('Done'), 'build was done sucess')
})

// describe('express serving', (t) => {
//   it('responds to / with the index.html', (t) => {
//     return request(app)
//       .get('/')
//       .expect('Content-Type', /html/)
//       .expect(200)
//       .then(res => expect(res.text).to.contain('<div id="root"></div>'))
//   })

//   it('responds to favicon.icon request', (t) => {
//     return request(app)
//       .get('/favicon.ico')
//       .expect('Content-Type', 'image/x-icon')
//       .expect(200)
//   })

test('render index.html as static file', async (t) => {
  t.plan(2)

  const res = await request(server.createServer(serverConfig, {}))
    .get('/index.html')

  t.is(res.status, 200)
  t.truthy(res.text.indexOf('<div id="root"></div>'), 'html container with root id was found')
})

test('get s3 signed url', async (t) => {
  t.plan(2)

  const fileName = 'background.png'
  const fileType = 'image/png'

  const res = await request(server.createServer(serverConfig, {}))
    .get(`/s3/sign?objectName=${fileName}&contentType=${fileType}`)

  t.is(res.status, 200)
  t.not(JSON.parse(res.text).signedRequest, '')
})
// test('responds to any route with the index.html', async (t) => {
//   const r = request(app)
//     .get('/index.html')
//     .expect('Content-Type', /html/)
//     .expect(200)
//     .then(res => expect(res.text).to.contain('<div id="root"></div>'))

//     t.same(await http.get('http://localhost'), {expected: 'output'})
//   })
// })
// })

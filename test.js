import test from 'ava'
import request from 'supertest'
import { exec } from 'mz/child_process'
import createServer from './dist/server.builded'

test('build application', async (t) => {
  t.plan(1)
  const build = exec('yarn run prestart')
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

  const res = await request(createServer({
    nodeEnv: test,
    port: 6006,
    timeout: 28000,
    schemaName: 'public',
    databaseUrl: '',
    sentryDns: '',
  }))
    .get('/index.html')

  t.is(res.status, 200)
  t.truthy(res.text.indexOf('<div id="root"></div>'), 'html container with root id was found')
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

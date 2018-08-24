import app from '~test/_utils/request'

describe('[controller] Welcome', () => {
  test('/ should respond with status 200 and greetings', done => {
    return app()
      .get('/')
      .expect(200, '🌍 GraphQL Koa TypeScript 🌍')
      .end(done)
  })
})

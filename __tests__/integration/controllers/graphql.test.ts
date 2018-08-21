import app from '~test/_utils/request'

describe('[controller] GraphQl', () => {
  test('/graphql it returns internal server error after sending empty request', done => {
    return app()
      .post('/graphql')
      .expect(500, 'POST body missing. Did you forget use body-parser middleware?')
      .end(done)
  })
})

import './init'

import ip from 'ip'
import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import compose from 'koa-compose'
import enforceHttps from 'koa-sslify'
import config from '~/config'
import routerMiddleware from '~/router'

export const createServer = (middlewares: Koa.Middleware[]) =>
  new Koa().use(compose(middlewares))

const app = createServer([
  ...(process.env.NODE_ENV === 'production' ? [
    enforceHttps({
        trustProtoHeader: true,
      })
  ] : []),
  koaBody(),
  routerMiddleware,
])

/* istanbul ignore if  */
if (!module.parent) {
  app.listen(config.server.port, () => {
    const address = `${ip.address()}:${config.server.port}`
    console.info(`Server running on ${address}`) // tslint:disable-line:no-console
  })
}

export default app

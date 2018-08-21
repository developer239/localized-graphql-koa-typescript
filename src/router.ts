import koaPlayground from 'graphql-playground-middleware-koa'
import compose from 'koa-compose'
import Router from 'koa-router'
import { graphqlController, welcomeController } from '~/controllers'

export const router = new Router()

router.get('/', welcomeController)

router.post('/graphql', graphqlController)

// GraphiQl on steroids 💪 https://github.com/prismagraphql/graphql-playground
router.all('/playground', koaPlayground({ endpoint: '/graphql' }))

export default compose([router.routes(), router.allowedMethods()])

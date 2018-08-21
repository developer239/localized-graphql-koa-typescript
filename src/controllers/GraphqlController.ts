import { graphqlKoa } from 'apollo-server-koa'
import fs from 'fs'
import { maskErrors, setDefaultHandler } from 'graphql-errors'
import { makeExecutableSchema } from 'graphql-tools'
import Koa from 'koa'
import resolvers from '~/resolvers'
import errorHandler from '~/services/graphqlError'

// This is a small hack that allows us to write schema in file with .graphql extension
const typeDefs = fs.readFileSync(
  __dirname + '/../schema/schema.graphql',
  'utf8'
)

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

setDefaultHandler(errorHandler)

// Mask Errors
maskErrors(myGraphQLSchema)

export default (context: Koa.Context, next: any) =>
  graphqlKoa({
    schema: myGraphQLSchema,
    context: {
      header: {
        ...context.request.header,
        language: context.request.header.language || 'en',
      },
    },
  })(context, next)

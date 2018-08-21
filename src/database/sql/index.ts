import Knex from 'knex'
import { Model } from 'objection'
import { knexSnakeCaseMappers } from 'objection'
import dbConfig from './dbConfig'

const knex = Knex(Object.assign({}, dbConfig, knexSnakeCaseMappers()))

Model.knex(knex)

export default knex

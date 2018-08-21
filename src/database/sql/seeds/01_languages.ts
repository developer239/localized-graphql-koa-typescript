import * as Knex from 'knex'

exports.seed = async (knex: Knex) => {
  await knex('languages').del()
  await knex('languages').insert([
    {
      code: 'en',
    },
    {
      code: 'cs',
    },
  ])
}

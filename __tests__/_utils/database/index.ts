import knex from '~/database/sql'

export const truncate = (names: string[]) =>
  knex.raw(`TRUNCATE TABLE ${names.join(', ')} RESTART IDENTITY CASCADE`)

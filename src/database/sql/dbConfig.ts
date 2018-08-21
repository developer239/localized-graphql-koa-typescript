// IMPORTANT: this file is imported by knex, use relative paths and import * as styntax

import * as path from 'path'
import config from '../../config'

export default {
  client: 'pg',
  connection: {
    database: config.database.sql.name,
    host: config.database.sql.host,
    password: config.database.sql.password,
    user: config.database.sql.user,
  },

  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    stub: path.resolve(__dirname, 'migration.stub'),
  },

  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
  },
}

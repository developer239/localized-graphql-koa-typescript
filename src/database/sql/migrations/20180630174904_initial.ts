import Knex from 'knex'

exports.up = (knex: Knex) =>
  knex.schema
    .createTable('languages', table => {
      table.increments('id').primary()
      table
        .string('code')
        .notNullable()
        .unique()
    })
    .createTable('pages', table => {
      table.increments('id').primary()
      table.boolean('is_public')
      table
        .integer('parent_id')
        .references('id')
        .inTable('pages')
        .onDelete('SET NULL')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('pages_tr', table => {
      table.increments('id').primary()
      table
        .string('language_code')
        .references('code')
        .inTable('languages')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('page_id')
        .references('id')
        .inTable('pages')
        .onDelete('CASCADE')
        .notNullable()
      table.string('title').notNullable()
      table.string('slug').notNullable()
      table.text('text')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })

exports.down = (knex: Knex) =>
  knex.schema
    .dropTable('pages_tr')
    .dropTable('languages')
    .dropTable('pages')

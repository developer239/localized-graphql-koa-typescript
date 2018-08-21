// IMPORTANT n + 1 seed will not work because referenced ids will not exist

import * as Knex from 'knex'

exports.seed = async (knex: Knex) => {
  await knex('pages').del()
  await knex('pages').insert([
    {
      is_public: true,
      parent_id: null,
    },
    {
      is_public: true,
      parent_id: 1,
    },
    {
      is_public: false,
      parent_id: 2,
    },
  ])
  await knex('pages_tr').del()
  await knex('pages_tr').insert([
    {
      language_code: 'en',
      page_id: 1,
      title: 'First Page',
      slug: 'first-page',
      text: 'Text on first page.',
    },
    {
      language_code: 'cs',
      page_id: 1,
      title: 'První Stránka',
      slug: 'prvni-stranka',
      text: 'Text na první stránce.',
    },
    {
      language_code: 'en',
      page_id: 2,
      title: 'Second Page',
      slug: 'second-page',
      text: 'Text on second page.',
    },
    {
      language_code: 'cs',
      page_id: 2,
      title: 'Druhá Stránka',
      slug: 'druha-stranka',
      text: 'Text na druhé stránce.',
    },
    {
      language_code: 'en',
      page_id: 3,
      title: 'Third Page',
      slug: 'third-page',
      text: 'Text on third page.',
    },
    {
      language_code: 'cs',
      page_id: 3,
      title: 'Třetí Stránka',
      slug: 'treti-stranka',
      text: 'Text na třetí stránce.',
    },
  ])
}

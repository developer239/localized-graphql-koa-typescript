import { QueryBuilder } from 'objection'
import '~/database/sql'
import { Page, PageTr } from '~/database/sql/models'
import { generatePage } from '~test/_utils/generate'

export const createPage = async (parentId?: number | undefined, languages: string[] = ['en', 'cs']) =>
  Page.query().upsertGraphAndFetch(
    generatePage({
      languages,
      parentId,
    }),
  )

export const createPages = async (numberOfPages: number) => {
  const pages = []
  for (const _ of Array(numberOfPages).fill(null)) {
    pages.push(await createPage())
  }
  return pages
}

export const getNumOfTranslations = async (pageId: number) => {
  const count = await PageTr
    .query()
    .where('pageId', pageId)
    .count('id')
    .pluck('count')
    .first() as any as string

  return parseInt(count, 10)
}

export const selectTranslatedById = (id: number, languageCode: string) => {
  return Page.query()
    .findById(id)
    .eager('[translations]')
    .modifyEager('translations', (builder: QueryBuilder<Page>) =>
      builder.where('languageCode', '=', languageCode)
    )
}

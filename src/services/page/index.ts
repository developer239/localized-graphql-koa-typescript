import { QueryBuilder } from 'objection'
import { Page, PageTr } from '~/database/sql/models'

export const selectTranslatedById = async (
  id: number,
  languageCode: string
) => {
  const page = await Page.query()
    .findById(id)
    .eager('[translations]')
    .modifyEager('translations', (builder: QueryBuilder<Page>) =>
      builder.where('languageCode', '=', languageCode)
    )

  if (!page || !page.translations.length) {
    return null
  }

  return page
}

export const selectAllTranslated = async (languageCode: string) => {
  const pages: Page[] = await Page.query()
    .eager('[translations]')
    .modifyEager('translations', (builder: QueryBuilder<Page>) =>
      builder.where('languageCode', '=', languageCode)
    )

  return pages.filter(page => Boolean(page.translations.length))
}

export const countNumberOfTranslations = async (pageId: number) => {
  const count = ((await PageTr.query()
    .where('pageId', pageId)
    .count('id')
    .pluck('count')
    .first()) as any) as string

  return parseInt(count, 10)
}

export const deleteTranslation = async ({
  pageId,
  languageCode,
}: {
  pageId: number
  languageCode: string
}) => {
  const pageToDelete = await selectTranslatedById(pageId, languageCode)

  if (!pageToDelete) {
    return false
  }

  await PageTr.query()
    .delete()
    .where({ pageId, languageCode })

  const numTranslations = await countNumberOfTranslations(pageId)
  if (numTranslations === 0) {
    await Page.query().deleteById(pageId)
  }

  return pageToDelete
}

export const upsertTranslation = async (
  input: IUpsertPageInput,
  languageCode: string
) => {
  const { id, isPublic, parentId, ...translatable } = input

  let translationId

  // If we are updating existing page
  if (id) {
    // We want to reference translation id
    translationId = await PageTr.query()
      .where({
        pageId: id,
        languageCode,
      })
      .pluck('id')
      .first()
  }

  return Page.query()
    .upsertGraph(
      {
        id,
        isPublic,
        parentId,
        translations: [
          {
            id: translationId,
            languageCode,
            ...translatable,
          },
        ],
      },
      { noDelete: true }
    )
    .eager('translations')
    .modifyEager('translations', q => q.where('languageCode', languageCode))
}

import * as pageService from '~/services/page'

export const createPage = async (
  _: undefined,
  { input, languageCode }: { input: IUpsertPageInput; languageCode: string }
) => {
  const page = await pageService.upsertTranslation(input, languageCode)
  return page.toJSON() as IPage
}

export const updatePage = async (
  _: undefined,
  { input, languageCode }: { input: IUpdatePageInput; languageCode: string }
) => {
  const page = await pageService.selectTranslatedById(input.id, languageCode)

  if (!page) {
    throw new Error(
      `Page id:${
        input.id
      } does not exist OR does not have ${languageCode} translation.`
    )
  }

  const updatedPage = await pageService.upsertTranslation(input, languageCode)
  return updatedPage.toJSON() as IPage
}

export const deletePage = async (
  _: undefined,
  { id, languageCode }: { id: number; languageCode: string }
) => {
  const deletedPage = await pageService.deleteTranslation({
    pageId: id,
    languageCode,
  })

  if (!deletedPage) {
    throw new Error(
      `Page id:${id} does not exist OR does not have ${languageCode} translation.`
    )
  }

  return deletedPage.toJSON() as IPage
}

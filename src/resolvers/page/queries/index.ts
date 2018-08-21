import * as pageService from '~/services/page'

export const resolvePages = async (
  _: undefined,
  __: {},
  context: IResolversContext
) => {
  const pages = await pageService.selectAllTranslated(context.header.language)
  return pages.map(page => page.toJSON() as IPage)
}

export const resolvePage = async (
  _: undefined,
  { id }: { id: number },
  context: IResolversContext
) => {
  const page = await pageService.selectTranslatedById(
    id,
    context.header.language
  )

  if (!page) {
    throw new Error('Page not found.')
  }

  return page.toJSON()
}

export const resolvePageParent = async (
  { parentId }: { parentId: number },
  __: {},
  context: IResolversContext
) => {
  const page = await pageService.selectTranslatedById(
    parentId,
    context.header.language
  )

  if (!page) {
    return null
  }

  return page.toJSON()
}

import { createPage, deletePage, updatePage } from './page/mutations'
import { resolvePage, resolvePageParent, resolvePages } from './page/queries'

export default {
  Query: {
    page: resolvePage,
    pages: resolvePages,
  },
  Mutation: {
    createPage,
    deletePage,
    updatePage,
  },
  // Separate type like this makes recursion possible
  Page: {
    parent: resolvePageParent,
  },
}

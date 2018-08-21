interface IResolversContext {
  header: {
    language: string
  }
}

interface IPage {
  id: number
  isPublic: boolean
  title: string
  slug: string
  text: string
  parentId: number
  parent: IPage
  createdAt: string
  updatedAt: string
}

interface IUpsertPageInput {
  id?: number
  isPublic?: boolean
  title: string
  slug?: string
  text: string
  parentId?: number
}

interface IUpdatePageInput {
  id: number
  isPublic?: boolean
  title: string
  slug?: string
  text: string
  parentId?: number
}

declare module 'graphql-errors'

import faker from 'faker'
import { pick } from 'ramda'

export interface IMockLanguage {
  id?: number
  code: string
}

export interface IMockPage {
  id?: number
  parentId?: number
  isPublic: boolean
  translations: Array<{
    languageCode: string
    title: string
    text: string
  }>
}

export const generateLanguage = (code?: string): IMockLanguage => ({
  code: code || faker.address.countryCode(),
})

export const generatePage = (args: {
  id?: number
  languages: string[]
  parentId?: number
}): IMockPage => ({
  ...pick(['id', 'parentId'], args),
  isPublic: faker.random.boolean(),
  translations: args.languages.map(language => ({
    languageCode: language,
    title: faker.lorem.words(2),
    text: faker.lorem.paragraphs(2),
  })),
})

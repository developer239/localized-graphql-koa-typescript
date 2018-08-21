import {
  createPage,
  deletePage,
  updatePage,
} from '~/resolvers/page/mutations'
import { truncate } from '~test/_utils/database'
import { createDefaultLanguages } from '~test/_utils/database/language'
import * as testData from '~test/_utils/database/page'

const INPUT = {
  isPublic: true,
  title: 'some title',
  text: 'some text',
  parentId: 1,
}

const DOES_NOT_EXIST_MESSAGE = 'Page id:1 does not exist OR does not have en translation.'

describe('[resolvers][mutations] Page', () => {
  beforeEach(async () => {
    await createDefaultLanguages()
  })

  afterEach(async () => {
    await truncate(['languages', 'pages', 'pages_tr'])
  })

  describe('createPage', () => {
    test('it creates new page with translation pages', async () => {
      const createdPage = await createPage(undefined, { input: INPUT, languageCode: 'en' })
      expect(createdPage).toMatchObject({
        id: 1,
        slug: 'some-title',
        ...INPUT,
      })
    })

    test('it adds translation to existing page', async () => {
      await testData.createPage(undefined, ['en'])

      const createdPage = await createPage(undefined, {
        input: { id: 1, ...INPUT },
        languageCode: 'cs',
      })
      const numTranslations = await testData.getNumOfTranslations(1)

      expect(numTranslations).toEqual(2)
      expect(createdPage).toMatchObject({
        id: 1,
        slug: 'some-title',
        ...INPUT,
      })
    })
  })

  describe('updatePage', () => {
    test('it updates page translation', async () => {
      await testData.createPage()
      const updatedPage = await updatePage(undefined, {
        input: {
          id: 1,
          slug: 'some-title', ...INPUT,
        },
        languageCode: 'en',
      })
      expect(updatedPage).toMatchObject({
        id: 1,
        slug: 'some-title',
        ...INPUT,
      })
    })

    test('it throw error if page does not exist', async () => {
      await updatePage(undefined, { input: { id: 1, ...INPUT }, languageCode: 'en' })
        .then(() => {
          throw new Error('FAILED TEST: Should go to .catch, not enter .then')
        })
        .catch((err) => {
          expect(err.message).toEqual(DOES_NOT_EXIST_MESSAGE)
        })
    })

    test('it throw error if page translation does not exist', async () => {
      await testData.createPage(undefined, ['cs'])
      await updatePage(undefined, { input: { id: 1, ...INPUT }, languageCode: 'en' })
        .then(() => {
          throw new Error('FAILED TEST: Should go to .catch, not enter .then')
        })
        .catch((err) => {
          expect(err.message).toEqual(DOES_NOT_EXIST_MESSAGE)
        })
    })
  })

  describe('deletePage', () => {
    test('it deletes page translation', async () => {
      const createdPage = await testData.createPage()
      const deletedPage = await deletePage(undefined, { id: 1, languageCode: 'en' })
      expect(deletedPage).toEqual(createdPage.toJSON())
    })

    test('it throws an error if page does not exist', async () => {
      await deletePage(undefined, { id: 1, languageCode: 'en' })
        .then(() => {
          throw new Error('FAILED TEST: Should go to .catch, not enter .then')
        })
        .catch((err) => {
          expect(err.message).toEqual(DOES_NOT_EXIST_MESSAGE)
        })
    })

    test('it throw error if page translation does not exist', async () => {
      await testData.createPage(undefined, ['cs'])
      await deletePage(undefined, { id: 1, languageCode: 'en' })
        .then(() => {
          throw new Error('FAILED TEST: Should go to .catch, not enter .then')
        })
        .catch((err) => {
          expect(err.message).toEqual(DOES_NOT_EXIST_MESSAGE)
        })
    })
  })
})

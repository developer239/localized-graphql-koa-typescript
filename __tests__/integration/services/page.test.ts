import { Page } from '~/database/sql/models'
import {
  countNumberOfTranslations,
  deleteTranslation,
  selectAllTranslated,
  selectTranslatedById,
  upsertTranslation,
} from '~/services/page'
import { truncate } from '~test/_utils/database'
import { createDefaultLanguages, createLanguage } from '~test/_utils/database/language'
import * as testData from '~test/_utils/database/page'

describe('[service] Page', () => {
  beforeEach(async () => {
    await createDefaultLanguages()
  })

  afterEach(async () => {
    await truncate(['languages', 'pages', 'pages_tr'])
  })

  describe('selectTranslatedById', () => {
    test('it selects translated page by id', async () => {
      const expectedPage = await testData.createPage()

      // note that we are selecting only english language mutation
      const page = await selectTranslatedById(1, 'en')

      expect(page!.toJSON()).toMatchObject(expectedPage.toJSON())
    })

    test('it return null if page is not found', async () => {
      const page = await selectTranslatedById(1, 'en')
      expect(page).toEqual(null)
    })

    test('it return null if page has no translation', async () => {
      const page = await selectTranslatedById(1, 'es')
      expect(page).toEqual(null)
    })
  })

  describe('selectAllTranslated', () => {
    test('it selects all translated pages', async () => {
      const expectedPages = await testData.createPages(3)

      // note that we are selecting only english language mutations
      const pages = await selectAllTranslated('en')

      expect(pages.length).toEqual(3)
      for (let index = 2; index >= 0; index -= 1) {
        expect(pages[index]!.toJSON()).toMatchObject(expectedPages[index].toJSON())
      }
    })

    test('it return an empty array if there are no pages', async () => {
      // note that we are selecting only english language mutations
      const pages = await selectAllTranslated('en')

      expect(pages.length).toEqual(0)
      expect(pages).toEqual([])
    })
  })

  describe('counterNumberOfTranslations', () => {
    test('it returns how many translations page has', async () => {
      await testData.createPage()

      const numTranslations = await countNumberOfTranslations(1)
      expect(numTranslations).toEqual(2)
    })

    test('it returns 0 if there are no translations', async () => {
      const numTranslations = await countNumberOfTranslations(1)
      expect(numTranslations).toEqual(0)
    })
  })

  describe('deleteTranslation', () => {
    test('it returns false if translation does not exist', async () => {
      const deletedPage = await deleteTranslation({ pageId: 1, languageCode: 'en' })
      expect(deletedPage).toEqual(false)
    })

    test('it deletes page translation', async () => {
      const expectedPage = await testData.createPage()
      const deletedPage = await deleteTranslation({ pageId: 1, languageCode: 'en' }) as any as Page

      const numTranslations = await testData.getNumOfTranslations(1)
      expect(numTranslations).toEqual(1)
      expect(expectedPage.toJSON()).toMatchObject(deletedPage.toJSON())
    })

    test('it deletes page if there are no other translations', async () => {
      await testData.createPage()
      await Promise.all([
        deleteTranslation({ pageId: 1, languageCode: 'en' }),
        deleteTranslation({ pageId: 1, languageCode: 'cs' }),
      ])

      const page = await Page.query().findById(1)
      const numTranslations = await testData.getNumOfTranslations(1)

      expect(numTranslations).toEqual(0)
      expect(page).toEqual(undefined)
    })
  })

  describe('upsertTranslation', () => {
    test('it creates new page with one translation', async () => {
      const data = {
        isPublic: true,
        title: 'my title',
        text: 'my text',
      }
      const createdPage = await upsertTranslation(data, 'en')
      expect(createdPage.toJSON()).toMatchObject({
        id: 1,
        slug: 'my-title',
        ...data,
      })
    })

    test('it updates translation of existing page', async () => {
      await testData.createPage()
      const data = {
        id: 1,
        isPublic: false, // note that this value is not translatable so it will change for all language mutations
        title: 'updated title',
        text: 'updated text',
        slug: 'updated-slug',
      }

      const oldPageCs = await testData.selectTranslatedById(1, 'cs')

      await upsertTranslation(data, 'en')

      const updatedPageEn = await testData.selectTranslatedById(1, 'en')
      const updatedPageCs = await testData.selectTranslatedById(1, 'cs')

      expect(updatedPageEn!.toJSON()).toMatchObject({
        id: 1,
        parentId: null,
        // We expect updated data here
        ...data,
      })

      expect(updatedPageCs!.toJSON()).toEqual({
        // We expect data that we had before here
        ...oldPageCs!.toJSON(),
        // but isPublic is false now
        isPublic: false,
      })
    })

    test('it adds translation to existing page', async () => {
      await createLanguage({ code: 'es' })
      await testData.createPage()
      const data = {
        id: 1,
        isPublic: true,
        title: 'my title es',
        text: 'my text es',
      }

      // Old page data
      const [pageEn, pageCs] = await Promise.all([
        testData.selectTranslatedById(1, 'en'),
        testData.selectTranslatedById(1, 'cs'),
      ])

      // Add new translation
      await upsertTranslation(data, 'es')

      // Updated page data
      const [updatedPageEn, updatedPageCs, newPageEs] = await Promise.all([
        testData.selectTranslatedById(1, 'en'),
        testData.selectTranslatedById(1, 'cs'),
        testData.selectTranslatedById(1, 'es'),
      ])

      expect(updatedPageCs!.toJSON()).toEqual(pageCs!.toJSON())
      expect(updatedPageEn!.toJSON()).toEqual(pageEn!.toJSON())
      expect(newPageEs!.toJSON()).toMatchObject(data)
    })
  })
})

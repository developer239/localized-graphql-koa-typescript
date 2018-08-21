import {
  resolvePages,
  resolvePage,
  resolvePageParent,
} from '~/resolvers/page/queries'
import { truncate } from '~test/_utils/database'
import { createDefaultLanguages } from '~test/_utils/database/language'
import * as testData from '~test/_utils/database/page'

describe('[resolvers][queries] Page', () => {
  beforeEach(async () => {
    await createDefaultLanguages()
  })

  afterEach(async () => {
    await truncate(['languages', 'pages', 'pages_tr'])
  })

  describe('resolvePages', () => {
    test('it selects pages', async () => {
      const expectedPages = await testData.createPages(3)

      // note that we are selecting only english language mutations
      const pages = await resolvePages(undefined, {}, { header: { language: 'en' } })

      expect(pages.length).toEqual(3)
      for (let index = 2; index >= 0; index -= 1) {
        expect(pages[index]).toEqual(expectedPages[index].toJSON())
      }
    })
  })

  describe('resolvePage', () => {
    test('it returns page', async () => {
      const expectedPage = await testData.createPage()

      // note that we are selecting only english language mutations
      const page = await resolvePage(undefined, { id: 1 }, { header: { language: 'en' } })

      expect(page).toEqual(expectedPage.toJSON())
    })

    test('it throws an error if page does not exist', async () => {
      await resolvePage(undefined, { id: 2 }, { header: { language: 'en' } })
        .then(() => {
          throw new Error('FAILED TEST: Should go to .catch, not enter .then')
        })
        .catch((err) => {
          expect(err.message).toEqual('Page not found.')
        })
    })
  })

  describe('resolvePageParent', () => {
    test('it returns page parent', async () => {
      const expectedPage = await testData.createPage()

      // note that we are selecting only english language mutations
      const page = await resolvePageParent({ parentId: 1 }, {}, { header: { language: 'en' } })

      expect(page).toEqual(expectedPage.toJSON())
    })

    test('it returns null if parent does not exist', async () => {
      // note that we are selecting only english language mutations
      const page = await resolvePageParent({ parentId: 2 }, {}, { header: { language: 'en' } })

      expect(page).toEqual(null)
    })
  })
})

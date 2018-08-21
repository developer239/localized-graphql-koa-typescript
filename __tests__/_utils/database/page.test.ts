import slugify from 'slugify'
import { mock } from '~mock/faker'
import { truncate } from '~test/_utils/database'
import { createDefaultLanguages } from './language'
import { createPage, createPages, getNumOfTranslations, selectTranslatedById } from './page'

describe('[utils] Database Page', () => {
  beforeEach(async () => {
    await createDefaultLanguages()
  })

  afterEach(async () => {
    mock.lorem.words.resetCallCount()
    await truncate(['languages', 'pages'])
  })

  describe('createPage', () => {
    test('it creates page in database', async () => {
      const page = await createPage()
      const mockTitle = mock.lorem.words.getNthValue(0)
      const expectedPage = {
        id: 1,
        isPublic: mock.random.boolean,
        text: mock.lorem.paragraphs,
        title: mockTitle,
        slug: slugify(mockTitle),
        parentId: null,
      }

      // note that .toJSON() returns only 1st language mutation
      expect(page.toJSON()).toMatchObject(expectedPage)
    })

    test('it creates page in database with parent', async () => {
      const page = await createPage(1)
      const mockTitle = mock.lorem.words.getNthValue(0)
      const expectedPage = {
        id: 1,
        isPublic: mock.random.boolean,
        text: mock.lorem.paragraphs,
        title: mockTitle,
        slug: slugify(mockTitle),
        parentId: 1,
      }

      // note that .toJSON() returns only 1st language mutation
      expect(page.toJSON()).toMatchObject(expectedPage)
    })
  })

  describe('createPages', () => {
    test('it creates multiple pages in database', async () => {
      const [firstPage, secondPage] = await createPages(2)
      const mockTitle0 = mock.lorem.words.getNthValue(0)
      const mockTitle1 = mock.lorem.words.getNthValue(2)

      // note that .toJSON() returns only 1st language mutation
      expect(firstPage.toJSON()).toMatchObject({
        id: 1,
        isPublic: mock.random.boolean,
        text: mock.lorem.paragraphs,
        title: mockTitle0,
        slug: slugify(mockTitle0),
        parentId: null,
      })
      // note that .toJSON() returns only 1st language mutation
      expect(secondPage.toJSON()).toMatchObject({
        id: 2,
        isPublic: mock.random.boolean,
        text: mock.lorem.paragraphs,
        title: mockTitle1,
        slug: slugify(mockTitle1),
        parentId: null,
      })
    })
  })

  describe('getNumOfTranslations', () => {
    test('it creates multiple pages in database', async () => {
      await createPage()
      const numTranslations = await getNumOfTranslations(1)
      expect(numTranslations).toEqual(2)
    })
  })

  describe('selectTranslatedById', () => {
    test('it selects translated page by id', async () => {
      const expectedPage = await createPage()

      // note that we are selecting only english language mutation
      const page = await selectTranslatedById(1, 'en')

      expect(page!.toJSON()).toMatchObject(expectedPage.toJSON())
    })
  })
})

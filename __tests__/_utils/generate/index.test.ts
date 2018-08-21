import { mock } from '~mock/faker'
import { truncate } from '~test/_utils/database'
import { generateLanguage, generatePage } from './index'

describe('[utils] Generate', () => {
  afterEach(async () => {
    await truncate(['languages'])
    mock.lorem.words.resetCallCount()
  })

  describe('generateLanguage', () => {
    test('it returns language with specific country code', async () => {
      expect(generateLanguage(mock.address.countryCode)).toEqual({
        code: mock.address.countryCode,
      })
    })

    test('it returns language with generated country code', async () => {
      expect(generateLanguage()).toEqual({ code: mock.address.countryCode })
    })
  })

  describe('generatePage', () => {
    const requiredParams = { languages: ['en', 'cs'] }
    const optionalParams = { id: 1, parentId: 2 }

    test('it returns with required arguments', async () => {
      expect(generatePage({ ...requiredParams })).toEqual({
        isPublic: mock.random.boolean,
        translations: [
          {
            languageCode: 'en',
            title: mock.lorem.words.getNthValue(0),
            text: mock.lorem.paragraphs,
          },
          {
            languageCode: 'cs',
            title: mock.lorem.words.getNthValue(1),
            text: mock.lorem.paragraphs,
          },
        ],
      })
    })

    test('it returns with all arguments', async () => {
      expect(generatePage({ ...requiredParams, ...optionalParams })).toEqual({
        isPublic: mock.random.boolean,
        id: 1,
        parentId: 2,
        translations: [
          {
            languageCode: 'en',
            title: mock.lorem.words.getNthValue(0),
            text: mock.lorem.paragraphs,
          },
          {
            languageCode: 'cs',
            title: mock.lorem.words.getNthValue(1),
            text: mock.lorem.paragraphs,
          },
        ],
      })
    })
  })
})

import { mock } from '~mock/faker'
import { truncate } from '~test/_utils/database'
import { createDefaultLanguages, createLanguage } from './language'

describe('[utils] Database Language', () => {
  afterEach(async () => {
    await truncate(['languages'])
  })

  describe('createLanguage', () => {
    test('it creates one with specific code in database', async () => {
      const language = await createLanguage({ code: 'en' })
      expect(language.toJSON()).toEqual({ id: 1, code: 'en' })
    })

    test('it creates one with random code in database', async () => {
      const language = await createLanguage()
      expect(language.toJSON()).toEqual({
        id: 1,
        code: mock.address.countryCode,
      })
    })
  })

  describe('createDefaultLanguages', () => {
    test('it creates default languages in database', async () => {
      const response = await createDefaultLanguages()
      expect(response).toEqual([{ id: 1, code: 'en' }, { id: 2, code: 'cs' }])
    })
  })
})

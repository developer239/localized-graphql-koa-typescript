import '~/database/sql'
import { Language } from '~/database/sql/models'
import { generateLanguage } from '~test/_utils/generate'

export const createLanguage = (args?: { code?: string }) => {
  return Language.query().insert(generateLanguage(args && args.code))
}

export const createDefaultLanguages = async () =>
  Promise.all([createLanguage({ code: 'en' }), createLanguage({ code: 'cs' })])

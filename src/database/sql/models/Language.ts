import { Model } from 'objection'

export class Language extends Model {
  public id: number
  public code: string

  static get tableName() {
    return 'languages'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code'],

      properties: {
        id: { type: 'integer' },
        code: { type: 'string', minLength: 2, maxLength: 255 },
      },
    }
  }
}

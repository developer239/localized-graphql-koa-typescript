import { Model, QueryContext } from 'objection'
import slugify from 'slugify'

export class PageTr extends Model {
  static get tableName() {
    return 'pages_tr'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'integer' },
        languageCode: { type: 'string' },
        pageId: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        slug: { type: 'string', minLength: 1, maxLength: 255 },
        text: { type: ['string', 'null'] },
      },
    }
  }

  public static relationMappings = () => {
    const Language = require(__dirname + '/Language').Language
    const Page = require(__dirname + '/Page').Page

    return {
      language: {
        join: {
          from: 'pages_tr.languageCode',
          to: 'languages.code',
        },
        modelClass: Language,
        relation: Model.BelongsToOneRelation,
      },
      page: {
        join: {
          from: 'pages_tr.pageId',
          to: 'pages.id',
        },
        modelClass: Page,
        relation: Model.BelongsToOneRelation,
      },
    }
  }

  public id: number
  public languageCode: string
  public pageId: number
  public title: string
  public slug: string
  public text: string

  public $beforeInsert(context: QueryContext) {
    super.$beforeInsert(context)
    if (!this.slug) {
      this.slug = slugify(this.title)
    }
  }
}

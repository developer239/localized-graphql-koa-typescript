import { Model } from 'objection'
import { omit } from 'ramda'

export class Page extends Model {
  public id: number
  public isPublic: boolean
  public title: string
  public slug: string
  public text: string
  public parentId: number
  public parent: Page
  public translations: any

  // TODO: Find out why this doesn't work
  // This is probably issue with objection https://github.com/Vincit/objection.js/issues/559
  // public translations: PageTranslation[]

  static get tableName() {
    return 'pages'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'integer' },
        isPublic: { type: 'boolean' },
        parentId: { type: ['integer', 'null'] },
      },
    }
  }

  static get relationMappings() {
    const PageTr = require(__dirname + '/PageTr').PageTr

    return {
      parent: {
        join: {
          from: 'pages.parentId',
          to: 'pages.id',
        },
        modelClass: Page,
        relation: Model.HasOneRelation,
      },
      translations: {
        join: {
          from: 'pages.id',
          to: 'pages_tr.pageId',
        },
        modelClass: PageTr,
        relation: Model.HasManyRelation,
      },
    }
  }

  public $formatJson(json: any): Promise<IPage> {
    const { translations, ...page }: any = omit(
      ['createdAt', 'updatedAt'],
      super.$formatJson(json)
    )

    if (translations) {
      const translation = omit(
        ['id', 'languageCode', 'pageId'],
        translations[0]
      )
      return {
        ...page,
        ...translation,
      }
    }

    return page
  }
}

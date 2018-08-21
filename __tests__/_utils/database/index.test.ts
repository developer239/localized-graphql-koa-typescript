import sinon from 'sinon'
import knex from '~/database/sql'
import { truncate } from './index'

describe('[utils] Database', () => {
  describe('truncate', () => {
    test('it truncates multiple tables', () => {
      const rawStub = sinon.stub(knex, 'raw')
      truncate(['firstTable', 'secondTable'])
      expect(rawStub.getCall(0).args[0]).toEqual(
        'TRUNCATE TABLE firstTable, secondTable RESTART IDENTITY CASCADE'
      )
    })
  })
})

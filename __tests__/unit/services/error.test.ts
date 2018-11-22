import { IsUserError } from 'graphql-errors'
import sinon from 'sinon'
import uuid from 'uuid'
import graphqlError from '~/services/graphqlError'

// TODO: Fix failing sinon type
const stub = sinon.stub(uuid, 'v4').returns(('fakeId' as any))

describe('[service] Error', () => {
  afterAll(() => {
    (console.error as any).restore()
    stub.restore();
  })

  describe('graphqlError', () => {
    test('it handles graphql-errors UserError', async () => {
      const mockError: any = {}
      mockError[IsUserError] = 'some error'
      expect(graphqlError(mockError)).toEqual(mockError)
    })

    test('it handles Error', async () => {
      const consoleLogMock = sinon.stub(global.console, 'error')

      const mockError = { message: 'some message' }

      const response = graphqlError(mockError)

      expect(consoleLogMock.callCount).toEqual(1)
      expect(consoleLogMock.getCall(0).args[0]).toEqual('[fakeId] Error: some message')
      expect(response).toEqual(mockError)
    })
  })
})

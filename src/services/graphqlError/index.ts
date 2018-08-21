import { IsUserError } from 'graphql-errors'
import uuid from 'uuid'

export default (error: any) => {
  if (error[IsUserError]) {
    return error
  }

  const errId = uuid.v4()

  // noinspection TsLint
  console.error(`[${errId}] Error: ${error.message}`)

  return error
}

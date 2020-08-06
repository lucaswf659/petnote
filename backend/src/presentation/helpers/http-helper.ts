import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors'

export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error
})

export const serverError = () => ({
  statusCode: 500,
  body: new ServerError()
})
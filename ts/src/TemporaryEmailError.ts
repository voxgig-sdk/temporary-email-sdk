
import { Context } from './Context'


class TemporaryEmailError extends Error {

  isTemporaryEmailError = true

  sdk = 'TemporaryEmail'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TemporaryEmailError
}


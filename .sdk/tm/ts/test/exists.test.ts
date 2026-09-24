
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TemporaryEmailSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TemporaryEmailSDK.test()
    equal(testsdk instanceof TemporaryEmailSDK, true,
      'TemporaryEmailSDK.test() must return a client synchronously')
  })

})


import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TemporaryEmailSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TemporaryEmailSDK.test()
    equal(null !== testsdk, true)
  })

})

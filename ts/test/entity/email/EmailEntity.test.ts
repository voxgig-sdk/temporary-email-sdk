

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TemporaryEmailSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('EmailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('TEMPORARY_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TemporaryEmailSDK.test()
    const ent = testsdk.Email()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMPORARY_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"email","name":"address","req":true,"short":"The generated temporary email address","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created_at","req":false,"short":"Timestamp when the email address was created","type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"expires_at","req":false,"short":"Timestamp when the email address will expire","type":"`$STRING`","index$":2}],"name":"email","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/generate","json":"{\"operationId\":\"generateEmail\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"value\":{\"address\":\"temp123@temporarymail.com\",\"created_at\":\"2024-01-01T12:00:00Z\",\"expires_at\":\"2024-01-01T13:00:00Z\"}}},\"schema\":{\"properties\":{\"address\":{\"description\":\"The generated temporary email address\",\"format\":\"email\",\"type\":\"string\"},\"created_at\":{\"description\":\"Timestamp when the email address was created\",\"format\":\"date-time\",\"type\":\"string\"},\"expires_at\":{\"description\":\"Timestamp when the email address will expire\",\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"address\"],\"type\":\"object\"}}},\"description\":\"Successfully generated temporary email address\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for categorizing the error\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/generate","segments":[{"lit":"api"},{"lit":"generate"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email","name__orig":"email","Name":"Email","name_":"email","name-":"email","NAME":"EMAIL","index$":0}, {"active":true,"entity":"email","key$":"BasicEmailFlow","kind":"basic","name":"BasicEmailFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"email_ref01","srcdatavar":"email_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_ref01"}}],"index$":0}]}, 'Email')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_ref01_data = Object.values(setup.data.existing.email)[0] as any

    // LOAD
    const email_ref01_ent = client.Email()
    const email_ref01_match_dt0: any = {}
    const email_ref01_data_dt0 = (await email_ref01_ent.load(email_ref01_match_dt0)).data()
    assert(null != email_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/email/EmailTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TemporaryEmailSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['email01','email02','email03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TEMPORARY_EMAIL_TEST_EMAIL_ENTID': idmap,
    'TEMPORARY_EMAIL_TEST_LIVE': 'FALSE',
    'TEMPORARY_EMAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TEMPORARY_EMAIL_TEST_EMAIL_ENTID']

  const live = 'TRUE' === env.TEMPORARY_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TEMPORARY_EMAIL_TEST_EMAIL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TemporaryEmailSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TEMPORARY_EMAIL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  



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


describe('InboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('TEMPORARY_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TemporaryEmailSDK.test()
    const ent = testsdk.Inbox()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMPORARY_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"email","name":"address","req":false,"short":"The temporary email address","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"messages","req":false,"short":"List of messages in the inbox","type":"`$ARRAY`","index$":2}],"id":{"field":"id","name":"id"},"name":"inbox","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"address","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/inbox/{address}","json":"{\"operationId\":\"getInbox\",\"parameters\":[{\"description\":\"The temporary email address\",\"in\":\"path\",\"name\":\"address\",\"required\":true,\"schema\":{\"format\":\"email\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"description\":\"The temporary email address\",\"format\":\"email\",\"type\":\"string\"},\"messages\":{\"description\":\"List of messages in the inbox\",\"items\":{\"properties\":{\"from\":{\"description\":\"Sender email address\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the message\",\"type\":\"string\"},\"preview\":{\"description\":\"Preview text of the message body\",\"type\":\"string\"},\"received_at\":{\"description\":\"Timestamp when the message was received\",\"format\":\"date-time\",\"type\":\"string\"},\"subject\":{\"description\":\"Email subject line\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved inbox messages\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for categorizing the error\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Email address not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for categorizing the error\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/inbox/{address}","rename":{"param":{"address":"id"}},"segments":[{"lit":"api"},{"lit":"inbox"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"inbox","name__orig":"inbox","Name":"Inbox","name_":"inbox","name-":"inbox","NAME":"INBOX","index$":1}, {"active":true,"entity":"inbox","key$":"BasicInboxFlow","kind":"basic","name":"BasicInboxFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"inbox_ref01","srcdatavar":"inbox_ref01_data","suffix":"_dt0"},"match":{"id":"inbox01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-inbox_ref01"}}],"index$":0}]}, 'Inbox')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let inbox_ref01_data = Object.values(setup.data.existing.inbox)[0] as any

    // LOAD
    const inbox_ref01_ent = client.Inbox()
    const inbox_ref01_match_dt0: any = {}
    inbox_ref01_match_dt0.id = inbox_ref01_data.id
    const inbox_ref01_data_dt0 = (await inbox_ref01_ent.load(inbox_ref01_match_dt0)).data()
    assert(inbox_ref01_data_dt0.id === inbox_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/inbox/InboxTestData.json')

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
    ['inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TEMPORARY_EMAIL_TEST_INBOX_ENTID': idmap,
    'TEMPORARY_EMAIL_TEST_LIVE': 'FALSE',
    'TEMPORARY_EMAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TEMPORARY_EMAIL_TEST_INBOX_ENTID']

  const live = 'TRUE' === env.TEMPORARY_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TEMPORARY_EMAIL_TEST_INBOX_ENTID']
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
  

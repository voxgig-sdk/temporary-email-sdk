

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


describe('MessageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('TEMPORARY_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TemporaryEmailSDK.test()
    const ent = testsdk.Message()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMPORARY_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'message.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"attachments","req":false,"short":"List of email attachments","type":"`$ARRAY`","index$":0},{"active":true,"name":"body","req":false,"short":"Full message body content","type":"`$STRING`","index$":1},{"active":true,"format":"email","name":"from","req":false,"short":"Sender email address","type":"`$STRING`","index$":2},{"active":true,"name":"html_body","req":false,"short":"HTML version of the message body","type":"`$STRING`","index$":3},{"active":true,"name":"id","req":false,"short":"Unique identifier for the message","type":"`$STRING`","index$":4},{"active":true,"format":"date-time","name":"received_at","req":false,"short":"Timestamp when the message was received","type":"`$STRING`","index$":5},{"active":true,"name":"subject","req":false,"short":"Email subject line","type":"`$STRING`","index$":6},{"active":true,"format":"email","name":"to","req":false,"short":"Recipient email address","type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"message","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"message_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/message/{messageId}","json":"{\"operationId\":\"getMessage\",\"parameters\":[{\"description\":\"The unique identifier of the message\",\"in\":\"path\",\"name\":\"messageId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"attachments\":{\"description\":\"List of email attachments\",\"items\":{\"properties\":{\"content_type\":{\"description\":\"MIME type of the attachment\",\"type\":\"string\"},\"filename\":{\"description\":\"Name of the attached file\",\"type\":\"string\"},\"size\":{\"description\":\"Size of the attachment in bytes\",\"type\":\"integer\"},\"url\":{\"description\":\"URL to download the attachment\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Full message body content\",\"type\":\"string\"},\"from\":{\"description\":\"Sender email address\",\"format\":\"email\",\"type\":\"string\"},\"html_body\":{\"description\":\"HTML version of the message body\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the message\",\"type\":\"string\"},\"received_at\":{\"description\":\"Timestamp when the message was received\",\"format\":\"date-time\",\"type\":\"string\"},\"subject\":{\"description\":\"Email subject line\",\"type\":\"string\"},\"to\":{\"description\":\"Recipient email address\",\"format\":\"email\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved message details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for categorizing the error\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Message not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for categorizing the error\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/message/{messageId}","rename":{"param":{"messageId":"id"}},"segments":[{"lit":"api"},{"lit":"message"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"message","name__orig":"message","Name":"Message","name_":"message","name-":"message","NAME":"MESSAGE","index$":2}, {"active":true,"entity":"message","key$":"BasicMessageFlow","kind":"basic","name":"BasicMessageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"message_ref01","srcdatavar":"message_ref01_data","suffix":"_dt0"},"match":{"id":"message01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-message_ref01"}}],"index$":0}]}, 'Message')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let message_ref01_data = Object.values(setup.data.existing.message)[0] as any

    // LOAD
    const message_ref01_ent = client.Message()
    const message_ref01_match_dt0: any = {}
    message_ref01_match_dt0.id = message_ref01_data.id
    const message_ref01_data_dt0 = (await message_ref01_ent.load(message_ref01_match_dt0)).data()
    assert(message_ref01_data_dt0.id === message_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/message/MessageTestData.json')

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
    ['message01','message02','message03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TEMPORARY_EMAIL_TEST_MESSAGE_ENTID': idmap,
    'TEMPORARY_EMAIL_TEST_LIVE': 'FALSE',
    'TEMPORARY_EMAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TEMPORARY_EMAIL_TEST_MESSAGE_ENTID']

  const live = 'TRUE' === env.TEMPORARY_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TEMPORARY_EMAIL_TEST_MESSAGE_ENTID']
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
  

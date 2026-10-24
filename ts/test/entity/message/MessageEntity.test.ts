

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TemporaryEmailSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TemporaryEmailSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Message().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMPORARY_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'message.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"sh":"List of email attachments","t":"`$ARRAY`","key$":"attachments","index$":0},"body":{"a":true,"h":"Body","n":"body","r":false,"sh":"Full message body content","t":"`$STRING`","key$":"body","index$":1},"from":{"a":true,"fo":"email","h":"From","n":"from","r":false,"sh":"Sender email address","t":"`$STRING`","key$":"from","index$":2},"html_body":{"a":true,"h":"Html Body","n":"html_body","r":false,"sh":"HTML version of the message body","t":"`$STRING`","key$":"html_body","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the message","t":"`$STRING`","key$":"id","index$":4},"received_at":{"a":true,"fo":"date-time","h":"Received At","n":"received_at","r":false,"sh":"Timestamp when the message was received","t":"`$STRING`","key$":"received_at","index$":5},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"sh":"Email subject line","t":"`$STRING`","key$":"subject","index$":6},"to":{"a":true,"fo":"email","h":"To","n":"to","r":false,"sh":"Recipient email address","t":"`$STRING`","key$":"to","index$":7}},"id":{"field":"id","name":"id"},"name":"message","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/message/{messageId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"messageId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/message/{messageId}","q":{"exist":["id"]},"r":{"param":{"messageId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"message"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"message","name__orig":"message","Name":"Message","name_":"message","name-":"message","NAME":"MESSAGE","index$":2}, {"active":true,"entity":"message","key$":"BasicMessageFlow","kind":"basic","name":"BasicMessageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"message_ref01","srcdatavar":"message_ref01_data","suffix":"_dt0"},"m":{"id":"message01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-message_ref01"}}],"index$":0}]}, 'Message', {"GET /api/message/{messageId}":{"protocol":"http","parameters":[{"name":"messageId","in":"path","required":true,"description":"The unique identifier of the message","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  

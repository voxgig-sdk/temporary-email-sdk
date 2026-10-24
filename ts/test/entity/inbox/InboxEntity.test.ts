

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


describe('InboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('TEMPORARY_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TemporaryEmailSDK.test()
    const ent = testsdk.Inbox()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TemporaryEmailSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Inbox().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMPORARY_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"fo":"email","h":"Address","n":"address","r":false,"sh":"The temporary email address","t":"`$STRING`","key$":"address","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"messages":{"a":true,"h":"Messages","n":"messages","r":false,"sh":"List of messages in the inbox","t":"`$ARRAY`","key$":"messages","index$":2}},"id":{"field":"id","name":"id"},"name":"inbox","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/inbox/{address}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"address","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/inbox/{address}","q":{"exist":["id"]},"r":{"param":{"address":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"inbox"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"inbox","name__orig":"inbox","Name":"Inbox","name_":"inbox","name-":"inbox","NAME":"INBOX","index$":1}, {"active":true,"entity":"inbox","key$":"BasicInboxFlow","kind":"basic","name":"BasicInboxFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"inbox_ref01","srcdatavar":"inbox_ref01_data","suffix":"_dt0"},"m":{"id":"inbox01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-inbox_ref01"}}],"index$":0}]}, 'Inbox', {"GET /api/inbox/{address}":{"protocol":"http","parameters":[{"name":"address","in":"path","required":true,"description":"The temporary email address","schema":{"type":"string","format":"email"},"index$":0}]}}, { strict: LIVE_STRICT, t })
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
  

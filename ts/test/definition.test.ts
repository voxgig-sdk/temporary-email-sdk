import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "email",
    "accessor": "Email",
    "op": "load",
    "method": "GET",
    "path": "/api/generate",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "address": "temp123@temporarymail.com",
      "created_at": "2024-01-01T12:00:00Z",
      "expires_at": "2024-01-01T13:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "inbox",
    "accessor": "Inbox",
    "op": "load",
    "method": "GET",
    "path": "/api/inbox/{address}",
    "args": [
      {
        "name": "id",
        "wire": "address",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "address": "x",
      "messages": [
        {
          "id": "x",
          "from": "x",
          "subject": "x",
          "received_at": "2026-01-01T00:00:00Z",
          "preview": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "message",
    "accessor": "Message",
    "op": "load",
    "method": "GET",
    "path": "/api/message/{messageId}",
    "args": [
      {
        "name": "id",
        "wire": "messageId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "from": "x",
      "to": "x",
      "subject": "x",
      "body": "x",
      "html_body": "x",
      "received_at": "2026-01-01T00:00:00Z",
      "attachments": [
        {
          "filename": "x",
          "content_type": "x",
          "size": 1,
          "url": "x"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})

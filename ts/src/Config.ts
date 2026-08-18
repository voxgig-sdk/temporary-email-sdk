
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'TemporaryEmail',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://www.temporarymail.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      email: {
      },

      inbox: {
      },

      message: {
      },

    }
  }


  entity = {
    "email": {
      "fields": [
        {
          "name": "address",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "expires_at",
          "type": "`$STRING`"
        }
      ],
      "name": "email",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/generate",
              "parts": [
                "api",
                "generate"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbox": {
      "fields": [
        {
          "name": "address",
          "type": "`$STRING`"
        },
        {
          "name": "messages",
          "type": "`$ARRAY`"
        }
      ],
      "name": "inbox",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "address",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/inbox/{address}",
              "parts": [
                "api",
                "inbox",
                "{id}"
              ],
              "rename": {
                "param": {
                  "address": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "message": {
      "fields": [
        {
          "name": "attachments",
          "type": "`$ARRAY`"
        },
        {
          "name": "body",
          "type": "`$STRING`"
        },
        {
          "name": "from",
          "type": "`$STRING`"
        },
        {
          "name": "html_body",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "received_at",
          "type": "`$STRING`"
        },
        {
          "name": "subject",
          "type": "`$STRING`"
        },
        {
          "name": "to",
          "type": "`$STRING`"
        }
      ],
      "name": "message",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "message_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/message/{messageId}",
              "parts": [
                "api",
                "message",
                "{id}"
              ],
              "rename": {
                "param": {
                  "messageId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}


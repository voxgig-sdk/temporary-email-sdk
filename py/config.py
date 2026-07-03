# TemporaryEmail SDK configuration


def make_config():
    return {
        "main": {
            "name": "TemporaryEmail",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://www.temporarymail.com",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "email": {},
                "inbox": {},
                "message": {},
            },
        },
        "entity": {
      "email": {
        "fields": [
          {
            "active": True,
            "name": "address",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "expires_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "email",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/generate",
                "parts": [
                  "api",
                  "generate",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "inbox": {
        "fields": [
          {
            "active": True,
            "name": "address",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "message",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
        ],
        "name": "inbox",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "address",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/inbox/{address}",
                "parts": [
                  "api",
                  "inbox",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "address": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "message": {
        "fields": [
          {
            "active": True,
            "name": "attachment",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "body",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "from",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "html_body",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "received_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "subject",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "to",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
        ],
        "name": "message",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "message_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/message/{messageId}",
                "parts": [
                  "api",
                  "message",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "messageId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

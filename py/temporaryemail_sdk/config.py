# TemporaryEmail SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "address",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "expires_at",
            "type": "`$STRING`",
          },
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
                  "generate",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "inbox": {
        "fields": [
          {
            "name": "address",
            "type": "`$STRING`",
          },
          {
            "name": "messages",
            "type": "`$ARRAY`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "message": {
        "fields": [
          {
            "name": "attachments",
            "type": "`$ARRAY`",
          },
          {
            "name": "body",
            "type": "`$STRING`",
          },
          {
            "name": "from",
            "type": "`$STRING`",
          },
          {
            "name": "html_body",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "received_at",
            "type": "`$STRING`",
          },
          {
            "name": "subject",
            "type": "`$STRING`",
          },
          {
            "name": "to",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

# TemporaryEmail SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "temporary-email",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "format": "email",
            "name": "address",
            "req": True,
            "short": "The generated temporary email address",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "created_at",
            "short": "Timestamp when the email address was created",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "expires_at",
            "short": "Timestamp when the email address will expire",
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
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "generate",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "generate",
                ],
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
            "format": "email",
            "name": "address",
            "short": "The temporary email address",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "messages",
            "short": "List of messages in the inbox",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "rename": {
                  "param": {
                    "address": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "inbox",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "inbox",
                  "{id}",
                ],
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
            "short": "List of email attachments",
            "type": "`$ARRAY`",
          },
          {
            "name": "body",
            "short": "Full message body content",
            "type": "`$STRING`",
          },
          {
            "format": "email",
            "name": "from",
            "short": "Sender email address",
            "type": "`$STRING`",
          },
          {
            "name": "html_body",
            "short": "HTML version of the message body",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the message",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "received_at",
            "short": "Timestamp when the message was received",
            "type": "`$STRING`",
          },
          {
            "name": "subject",
            "short": "Email subject line",
            "type": "`$STRING`",
          },
          {
            "format": "email",
            "name": "to",
            "short": "Recipient email address",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "rename": {
                  "param": {
                    "messageId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "message",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "message",
                  "{id}",
                ],
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

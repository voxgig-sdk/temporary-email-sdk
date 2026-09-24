# TemporaryEmail SDK configuration

module TemporaryEmailConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "TemporaryEmail",
        "slug" => "temporary-email",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://www.temporarymail.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "email" => {},
          "inbox" => {},
          "message" => {},
        },
      },
      "entity" => {
        "email" => {
          "fields" => [
            {
              "name" => "address",
              "title" => "Address",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The generated temporary email address",
              "format" => "email",
            },
            {
              "name" => "created_at",
              "title" => "Created At",
              "type" => "`$STRING`",
              "short" => "Timestamp when the email address was created",
              "format" => "date-time",
            },
            {
              "name" => "expires_at",
              "title" => "Expires At",
              "type" => "`$STRING`",
              "short" => "Timestamp when the email address will expire",
              "format" => "date-time",
            },
          ],
          "name" => "email",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/generate",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "generate",
                    },
                  ],
                  "parts" => [
                    "api",
                    "generate",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "inbox" => {
          "fields" => [
            {
              "name" => "address",
              "title" => "Address",
              "type" => "`$STRING`",
              "short" => "The temporary email address",
              "format" => "email",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "messages",
              "title" => "Messages",
              "type" => "`$ARRAY`",
              "short" => "List of messages in the inbox",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "inbox",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/inbox/{address}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "inbox",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "api",
                    "inbox",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "address" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "address",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "message" => {
          "fields" => [
            {
              "name" => "attachments",
              "title" => "Attachments",
              "type" => "`$ARRAY`",
              "short" => "List of email attachments",
            },
            {
              "name" => "body",
              "title" => "Body",
              "type" => "`$STRING`",
              "short" => "Full message body content",
            },
            {
              "name" => "from",
              "title" => "From",
              "type" => "`$STRING`",
              "short" => "Sender email address",
              "format" => "email",
            },
            {
              "name" => "html_body",
              "title" => "Html Body",
              "type" => "`$STRING`",
              "short" => "HTML version of the message body",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "Unique identifier for the message",
            },
            {
              "name" => "received_at",
              "title" => "Received At",
              "type" => "`$STRING`",
              "short" => "Timestamp when the message was received",
              "format" => "date-time",
            },
            {
              "name" => "subject",
              "title" => "Subject",
              "type" => "`$STRING`",
              "short" => "Email subject line",
            },
            {
              "name" => "to",
              "title" => "To",
              "type" => "`$STRING`",
              "short" => "Recipient email address",
              "format" => "email",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "message",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/message/{messageId}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "message",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "api",
                    "message",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "messageId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "message_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    TemporaryEmailFeatures.make_feature(name)
  end
end

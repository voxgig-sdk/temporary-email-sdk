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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "expires_at",
              "type" => "`$STRING`",
            },
          ],
          "name" => "email",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/generate",
                  "parts" => [
                    "api",
                    "generate",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "messages",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "inbox",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "address",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/inbox/{address}",
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "type" => "`$ARRAY`",
            },
            {
              "name" => "body",
              "type" => "`$STRING`",
            },
            {
              "name" => "from",
              "type" => "`$STRING`",
            },
            {
              "name" => "html_body",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "received_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "subject",
              "type" => "`$STRING`",
            },
            {
              "name" => "to",
              "type" => "`$STRING`",
            },
          ],
          "name" => "message",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "message_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/message/{messageId}",
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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

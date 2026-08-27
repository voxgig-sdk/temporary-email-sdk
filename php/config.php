<?php
declare(strict_types=1);

// TemporaryEmail SDK configuration

class TemporaryEmailConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TemporaryEmail",
                "slug" => "temporary-email",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://www.temporarymail.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "email" => [],
                    "inbox" => [],
                    "message" => [],
                ],
            ],
            "entity" => [
        'email' => [
          'fields' => [
            [
              'name' => 'address',
              'req' => true,
              'short' => 'The generated temporary email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'created_at',
              'short' => 'Timestamp when the email address was created',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_at',
              'short' => 'Timestamp when the email address will expire',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'email',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/generate',
                  'parts' => [
                    'api',
                    'generate',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'inbox' => [
          'fields' => [
            [
              'name' => 'address',
              'short' => 'The temporary email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'messages',
              'short' => 'List of messages in the inbox',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'inbox',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'address',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/inbox/{address}',
                  'parts' => [
                    'api',
                    'inbox',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'address' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'message' => [
          'fields' => [
            [
              'name' => 'attachments',
              'short' => 'List of email attachments',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'body',
              'short' => 'Full message body content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'from',
              'short' => 'Sender email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'html_body',
              'short' => 'HTML version of the message body',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the message',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'received_at',
              'short' => 'Timestamp when the message was received',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'subject',
              'short' => 'Email subject line',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'to',
              'short' => 'Recipient email address',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'message',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/message/{messageId}',
                  'parts' => [
                    'api',
                    'message',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'messageId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TemporaryEmailFeatures::make_feature($name);
    }
}

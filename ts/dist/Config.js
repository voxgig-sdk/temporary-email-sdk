"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'TemporaryEmail',
        slug: "temporary-email",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://www.temporarymail.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            email: {},
            inbox: {},
            message: {},
        }
    };
    entity = {
        "email": {
            "fields": [
                {
                    "format": "email",
                    "name": "address",
                    "req": true,
                    "short": "The generated temporary email address",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "created_at",
                    "short": "Timestamp when the email address was created",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "expires_at",
                    "short": "Timestamp when the email address will expire",
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
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "generate"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "generate"
                            ]
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
                    "format": "email",
                    "name": "address",
                    "short": "The temporary email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "messages",
                    "short": "List of messages in the inbox",
                    "type": "`$ARRAY`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/inbox/{address}",
                            "rename": {
                                "param": {
                                    "address": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "inbox"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "inbox",
                                "{id}"
                            ]
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
                    "short": "List of email attachments",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "body",
                    "short": "Full message body content",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "from",
                    "short": "Sender email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "html_body",
                    "short": "HTML version of the message body",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the message",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "received_at",
                    "short": "Timestamp when the message was received",
                    "type": "`$STRING`"
                },
                {
                    "name": "subject",
                    "short": "Email subject line",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "to",
                    "short": "Recipient email address",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/message/{messageId}",
                            "rename": {
                                "param": {
                                    "messageId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "message"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "message",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map
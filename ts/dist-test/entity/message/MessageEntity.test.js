"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('MessageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TEMPORARY_EMAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TemporaryEmailSDK.test();
        const ent = testsdk.Message();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TEMPORARY_EMAIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'message.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "attachments": { "a": true, "h": "Attachments", "n": "attachments", "r": false, "sh": "List of email attachments", "t": "`$ARRAY`", "key$": "attachments", "index$": 0 }, "body": { "a": true, "h": "Body", "n": "body", "r": false, "sh": "Full message body content", "t": "`$STRING`", "key$": "body", "index$": 1 }, "from": { "a": true, "fo": "email", "h": "From", "n": "from", "r": false, "sh": "Sender email address", "t": "`$STRING`", "key$": "from", "index$": 2 }, "html_body": { "a": true, "h": "Html Body", "n": "html_body", "r": false, "sh": "HTML version of the message body", "t": "`$STRING`", "key$": "html_body", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the message", "t": "`$STRING`", "key$": "id", "index$": 4 }, "received_at": { "a": true, "fo": "date-time", "h": "Received At", "n": "received_at", "r": false, "sh": "Timestamp when the message was received", "t": "`$STRING`", "key$": "received_at", "index$": 5 }, "subject": { "a": true, "h": "Subject", "n": "subject", "r": false, "sh": "Email subject line", "t": "`$STRING`", "key$": "subject", "index$": 6 }, "to": { "a": true, "fo": "email", "h": "To", "n": "to", "r": false, "sh": "Recipient email address", "t": "`$STRING`", "key$": "to", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "message", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/message/{messageId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "message_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/message/{messageId}", "q": { "exist": ["id"] }, "r": { "param": { "messageId": "id" } }, "s": [{ "lit": "api" }, { "lit": "message" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "message", "name__orig": "message", "Name": "Message", "name_": "message", "name-": "message", "NAME": "MESSAGE", "index$": 2 }, { "active": true, "entity": "message", "key$": "BasicMessageFlow", "kind": "basic", "name": "BasicMessageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "message_ref01", "srcdatavar": "message_ref01_data", "suffix": "_dt0" }, "m": { "id": "message01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-message_ref01" } }], "index$": 0 }] }, 'Message', { "GET /api/message/{messageId}": { "protocol": "http", "operationId": "getMessage", "responses": { "200": { "description": "Successfully retrieved message details", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "description": "Unique identifier for the message", "key$": "id" }, "from": { "type": "string", "format": "email", "description": "Sender email address", "key$": "from" }, "to": { "type": "string", "format": "email", "description": "Recipient email address", "key$": "to" }, "subject": { "type": "string", "description": "Email subject line", "key$": "subject" }, "body": { "type": "string", "description": "Full message body content", "key$": "body" }, "html_body": { "type": "string", "description": "HTML version of the message body", "key$": "html_body" }, "received_at": { "type": "string", "format": "date-time", "description": "Timestamp when the message was received", "key$": "received_at" }, "attachments": { "type": "array", "items": { "type": "object", "properties": { "filename": { "type": "string", "description": "Name of the attached file" }, "content_type": { "type": "string", "description": "MIME type of the attachment" }, "size": { "type": "integer", "description": "Size of the attachment in bytes" }, "url": { "type": "string", "format": "uri", "description": "URL to download the attachment" } }, "x-ref": "#/components/schemas/Attachment" }, "description": "List of email attachments", "key$": "attachments" } }, "x-ref": "#/components/schemas/MessageDetails", "index$": 0 } } } }, "404": { "description": "Message not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for categorizing the error" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for categorizing the error" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "messageId", "in": "path", "required": true, "description": "The unique identifier of the message", "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let message_ref01_data = Object.values(setup.data.existing.message)[0];
        // LOAD
        const message_ref01_ent = client.Message();
        const message_ref01_match_dt0 = {};
        message_ref01_match_dt0.id = message_ref01_data.id;
        const message_ref01_data_dt0 = (await message_ref01_ent.load(message_ref01_match_dt0)).data();
        (0, node_assert_1.default)(message_ref01_data_dt0.id === message_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/message/MessageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TemporaryEmailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['message01', 'message02', 'message03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TEMPORARY_EMAIL_TEST_MESSAGE_ENTID': idmap,
        'TEMPORARY_EMAIL_TEST_LIVE': 'FALSE',
        'TEMPORARY_EMAIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TEMPORARY_EMAIL_TEST_MESSAGE_ENTID'];
    const live = 'TRUE' === env.TEMPORARY_EMAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TEMPORARY_EMAIL_TEST_MESSAGE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TemporaryEmailSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=MessageEntity.test.js.map
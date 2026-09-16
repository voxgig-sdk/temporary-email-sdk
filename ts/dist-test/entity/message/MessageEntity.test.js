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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "attachments", "req": false, "short": "List of email attachments", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "body", "req": false, "short": "Full message body content", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "email", "name": "from", "req": false, "short": "Sender email address", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "html_body", "req": false, "short": "HTML version of the message body", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the message", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date-time", "name": "received_at", "req": false, "short": "Timestamp when the message was received", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "subject", "req": false, "short": "Email subject line", "type": "`$STRING`", "index$": 6 }, { "active": true, "format": "email", "name": "to", "req": false, "short": "Recipient email address", "type": "`$STRING`", "index$": 7 }], "id": { "field": "id", "name": "id" }, "name": "message", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "message_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/message/{messageId}", "json": "{\"operationId\":\"getMessage\",\"parameters\":[{\"description\":\"The unique identifier of the message\",\"in\":\"path\",\"name\":\"messageId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"attachments\":{\"description\":\"List of email attachments\",\"items\":{\"properties\":{\"content_type\":{\"description\":\"MIME type of the attachment\",\"type\":\"string\"},\"filename\":{\"description\":\"Name of the attached file\",\"type\":\"string\"},\"size\":{\"description\":\"Size of the attachment in bytes\",\"type\":\"integer\"},\"url\":{\"description\":\"URL to download the attachment\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Full message body content\",\"type\":\"string\"},\"from\":{\"description\":\"Sender email address\",\"format\":\"email\",\"type\":\"string\"},\"html_body\":{\"description\":\"HTML version of the message body\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the message\",\"type\":\"string\"},\"received_at\":{\"description\":\"Timestamp when the message was received\",\"format\":\"date-time\",\"type\":\"string\"},\"subject\":{\"description\":\"Email subject line\",\"type\":\"string\"},\"to\":{\"description\":\"Recipient email address\",\"format\":\"email\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved message details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for categorizing the error\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Message not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for categorizing the error\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/message/{messageId}", "rename": { "param": { "messageId": "id" } }, "segments": [{ "lit": "api" }, { "lit": "message" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "message", "name__orig": "message", "Name": "Message", "name_": "message", "name-": "message", "NAME": "MESSAGE", "index$": 2 }, { "active": true, "entity": "message", "key$": "BasicMessageFlow", "kind": "basic", "name": "BasicMessageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "message_ref01", "srcdatavar": "message_ref01_data", "suffix": "_dt0" }, "match": { "id": "message01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-message_ref01" } }], "index$": 0 }] }, 'Message');
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
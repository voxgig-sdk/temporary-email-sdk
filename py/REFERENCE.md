# TemporaryEmail Python SDK Reference

Complete API reference for the TemporaryEmail Python SDK.


## TemporaryEmailSDK

### Constructor

```python
from temporaryemail_sdk import TemporaryEmailSDK

client = TemporaryEmailSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TemporaryEmailSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = TemporaryEmailSDK.test()
```


### Instance Methods

#### `Email(data=None)`

Create a new `EmailEntity` instance. Pass `None` for no initial data.

#### `Inbox(data=None)`

Create a new `InboxEntity` instance. Pass `None` for no initial data.

#### `Message(data=None)`

Create a new `MessageEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## EmailEntity

```python
email = client.Email()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | Yes | The generated temporary email address |
| `created_at` | `str` | No | Timestamp when the email address was created |
| `expires_at` | `str` | No | Timestamp when the email address will expire |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Email().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboxEntity

```python
inbox = client.Inbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No | The temporary email address |
| `messages` | `list` | No | List of messages in the inbox |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Inbox().load({"id": "inbox_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessageEntity

```python
message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `list` | No | List of email attachments |
| `body` | `str` | No | Full message body content |
| `from` | `str` | No | Sender email address |
| `html_body` | `str` | No | HTML version of the message body |
| `id` | `str` | No | Unique identifier for the message |
| `received_at` | `str` | No | Timestamp when the message was received |
| `subject` | `str` | No | Email subject line |
| `to` | `str` | No | Recipient email address |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Message().load({"id": "message_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = TemporaryEmailSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "TemporaryEmail",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://www.temporarymail.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"email": map[string]any{},
				"inbox": map[string]any{},
				"message": map[string]any{},
			},
		},
		"entity": map[string]any{
			"email": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_at",
						"type": "`$STRING`",
					},
				},
				"name": "email",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/generate",
								"parts": []any{
									"api",
									"generate",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messages",
						"type": "`$ARRAY`",
					},
				},
				"name": "inbox",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "address",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/inbox/{address}",
								"parts": []any{
									"api",
									"inbox",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"address": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"message": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attachments",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "html_body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "received_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "to",
						"type": "`$STRING`",
					},
				},
				"name": "message",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "message_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/message/{messageId}",
								"parts": []any{
									"api",
									"message",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

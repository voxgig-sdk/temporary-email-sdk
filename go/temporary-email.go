package voxgigtemporaryemailsdk

import (
	"github.com/voxgig-sdk/temporary-email-sdk/core"
	"github.com/voxgig-sdk/temporary-email-sdk/entity"
	"github.com/voxgig-sdk/temporary-email-sdk/feature"
	_ "github.com/voxgig-sdk/temporary-email-sdk/utility"
)

// Type aliases preserve external API.
type TemporaryEmailSDK = core.TemporaryEmailSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TemporaryEmailEntity = core.TemporaryEmailEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TemporaryEmailError = core.TemporaryEmailError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEmailEntityFunc = func(client *core.TemporaryEmailSDK, entopts map[string]any) core.TemporaryEmailEntity {
		return entity.NewEmailEntity(client, entopts)
	}
	core.NewInboxEntityFunc = func(client *core.TemporaryEmailSDK, entopts map[string]any) core.TemporaryEmailEntity {
		return entity.NewInboxEntity(client, entopts)
	}
	core.NewMessageEntityFunc = func(client *core.TemporaryEmailSDK, entopts map[string]any) core.TemporaryEmailEntity {
		return entity.NewMessageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTemporaryEmailSDK = core.NewTemporaryEmailSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature

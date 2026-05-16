package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEmailEntityFunc func(client *TemporaryEmailSDK, entopts map[string]any) TemporaryEmailEntity

var NewInboxEntityFunc func(client *TemporaryEmailSDK, entopts map[string]any) TemporaryEmailEntity

var NewMessageEntityFunc func(client *TemporaryEmailSDK, entopts map[string]any) TemporaryEmailEntity


package = "voxgig-sdk-temporary-email"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/temporary-email-sdk.git"
}
description = {
  summary = "TemporaryEmail SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["temporary-email_sdk"] = "temporary-email_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}

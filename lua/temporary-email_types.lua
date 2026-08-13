-- Typed models for the TemporaryEmail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Email
---@field address string
---@field created_at? string
---@field expires_at? string

---@class EmailLoadMatch
---@field address? string
---@field created_at? string
---@field expires_at? string

---@class Inbox
---@field address? string
---@field messages? table

---@class InboxLoadMatch
---@field id string

---@class Message
---@field attachments? table
---@field body? string
---@field from? string
---@field html_body? string
---@field id? string
---@field received_at? string
---@field subject? string
---@field to? string

---@class MessageLoadMatch
---@field id string

local M = {}

return M

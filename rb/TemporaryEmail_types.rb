# frozen_string_literal: true

# Typed models for the TemporaryEmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Email entity data model.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
Email = Struct.new(
  :address,
  :created_at,
  :expires_at,
  keyword_init: true
)

# Request payload for Email#load.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
EmailLoadMatch = Struct.new(
  :address,
  :created_at,
  :expires_at,
  keyword_init: true
)

# Inbox entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
Inbox = Struct.new(
  :address,
  :messages,
  keyword_init: true
)

# Request payload for Inbox#load.
#
# @!attribute [rw] id
#   @return [String]
InboxLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Message entity data model.
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] html_body
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] received_at
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
Message = Struct.new(
  :attachments,
  :body,
  :from,
  :html_body,
  :id,
  :received_at,
  :subject,
  :to,
  keyword_init: true
)

# Request payload for Message#load.
#
# @!attribute [rw] id
#   @return [String]
MessageLoadMatch = Struct.new(
  :id,
  keyword_init: true
)


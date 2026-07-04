# Typed models for the TemporaryEmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class EmailRequired(TypedDict):
    address: str


class Email(EmailRequired, total=False):
    created_at: str
    expires_at: str


class EmailLoadMatch(TypedDict, total=False):
    address: str
    created_at: str
    expires_at: str


class Inbox(TypedDict, total=False):
    address: str
    message: list


class InboxLoadMatch(TypedDict):
    id: str


class Message(TypedDict, total=False):
    attachment: list
    body: str
    html_body: str
    id: str
    received_at: str
    subject: str
    to: str


class MessageLoadMatch(TypedDict):
    id: str

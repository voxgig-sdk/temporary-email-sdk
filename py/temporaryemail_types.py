# Typed models for the TemporaryEmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Email:
    address: str
    created_at: Optional[str] = None
    expires_at: Optional[str] = None


@dataclass
class EmailLoadMatch:
    address: Optional[str] = None
    created_at: Optional[str] = None
    expires_at: Optional[str] = None


@dataclass
class Inbox:
    address: Optional[str] = None
    message: Optional[list] = None


@dataclass
class InboxLoadMatch:
    id: str


@dataclass
class Message:
    attachment: Optional[list] = None
    body: Optional[str] = None
    html_body: Optional[str] = None
    id: Optional[str] = None
    received_at: Optional[str] = None
    subject: Optional[str] = None
    to: Optional[str] = None


@dataclass
class MessageLoadMatch:
    id: str


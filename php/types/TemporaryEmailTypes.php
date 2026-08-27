<?php
declare(strict_types=1);

// Typed models for the TemporaryEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Email entity data model. */
class Email
{
    public string $address;
    public ?string $created_at = null;
    public ?string $expires_at = null;
}

/** Request payload for Email#load. */
class EmailLoadMatch
{
    public ?string $address = null;
    public ?string $created_at = null;
    public ?string $expires_at = null;
}

/** Inbox entity data model. */
class Inbox
{
    public ?string $address = null;
    public ?string $id = null;
    public ?array $messages = null;
}

/** Request payload for Inbox#load. */
class InboxLoadMatch
{
    public string $id;
}

/** Message entity data model. */
class Message
{
    public ?array $attachments = null;
    public ?string $body = null;
    public ?string $from = null;
    public ?string $html_body = null;
    public ?string $id = null;
    public ?string $received_at = null;
    public ?string $subject = null;
    public ?string $to = null;
}

/** Request payload for Message#load. */
class MessageLoadMatch
{
    public string $id;
}


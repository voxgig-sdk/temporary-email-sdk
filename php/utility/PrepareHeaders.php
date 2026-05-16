<?php
declare(strict_types=1);

// TemporaryEmail SDK utility: prepare_headers

class TemporaryEmailPrepareHeaders
{
    public static function call(TemporaryEmailContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}

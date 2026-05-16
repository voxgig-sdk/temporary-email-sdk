<?php
declare(strict_types=1);

// TemporaryEmail SDK utility: prepare_body

class TemporaryEmailPrepareBody
{
    public static function call(TemporaryEmailContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

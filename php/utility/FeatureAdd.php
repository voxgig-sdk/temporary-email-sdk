<?php
declare(strict_types=1);

// TemporaryEmail SDK utility: feature_add

class TemporaryEmailFeatureAdd
{
    public static function call(TemporaryEmailContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

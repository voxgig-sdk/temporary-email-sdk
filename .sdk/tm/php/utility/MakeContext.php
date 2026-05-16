<?php
declare(strict_types=1);

// TemporaryEmail SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TemporaryEmailMakeContext
{
    public static function call(array $ctxmap, ?TemporaryEmailContext $basectx): TemporaryEmailContext
    {
        return new TemporaryEmailContext($ctxmap, $basectx);
    }
}

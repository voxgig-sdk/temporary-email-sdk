<?php
declare(strict_types=1);

// TemporaryEmail SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TemporaryEmailFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TemporaryEmailBaseFeature();
            case "test":
                return new TemporaryEmailTestFeature();
            default:
                return new TemporaryEmailBaseFeature();
        }
    }
}

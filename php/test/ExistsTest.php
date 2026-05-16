<?php
declare(strict_types=1);

// TemporaryEmail SDK exists test

require_once __DIR__ . '/../temporaryemail_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TemporaryEmailSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}

<?php
declare(strict_types=1);

// TemporaryEmail SDK base feature

class TemporaryEmailBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TemporaryEmailContext $ctx, array $options): void {}
    public function PostConstruct(TemporaryEmailContext $ctx): void {}
    public function PostConstructEntity(TemporaryEmailContext $ctx): void {}
    public function SetData(TemporaryEmailContext $ctx): void {}
    public function GetData(TemporaryEmailContext $ctx): void {}
    public function GetMatch(TemporaryEmailContext $ctx): void {}
    public function SetMatch(TemporaryEmailContext $ctx): void {}
    public function PrePoint(TemporaryEmailContext $ctx): void {}
    public function PreSpec(TemporaryEmailContext $ctx): void {}
    public function PreRequest(TemporaryEmailContext $ctx): void {}
    public function PreResponse(TemporaryEmailContext $ctx): void {}
    public function PreResult(TemporaryEmailContext $ctx): void {}
    public function PreDone(TemporaryEmailContext $ctx): void {}
    public function PreUnexpected(TemporaryEmailContext $ctx): void {}
}

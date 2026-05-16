<?php
declare(strict_types=1);

// TemporaryEmail SDK utility: result_body

class TemporaryEmailResultBody
{
    public static function call(TemporaryEmailContext $ctx): ?TemporaryEmailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

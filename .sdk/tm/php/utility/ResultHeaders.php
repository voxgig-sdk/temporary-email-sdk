<?php
declare(strict_types=1);

// TemporaryEmail SDK utility: result_headers

class TemporaryEmailResultHeaders
{
    public static function call(TemporaryEmailContext $ctx): ?TemporaryEmailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

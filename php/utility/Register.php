<?php
declare(strict_types=1);

// TemporaryEmail SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TemporaryEmailUtility::setRegistrar(function (TemporaryEmailUtility $u): void {
    $u->clean = [TemporaryEmailClean::class, 'call'];
    $u->done = [TemporaryEmailDone::class, 'call'];
    $u->make_error = [TemporaryEmailMakeError::class, 'call'];
    $u->feature_add = [TemporaryEmailFeatureAdd::class, 'call'];
    $u->feature_hook = [TemporaryEmailFeatureHook::class, 'call'];
    $u->feature_init = [TemporaryEmailFeatureInit::class, 'call'];
    $u->fetcher = [TemporaryEmailFetcher::class, 'call'];
    $u->make_fetch_def = [TemporaryEmailMakeFetchDef::class, 'call'];
    $u->make_context = [TemporaryEmailMakeContext::class, 'call'];
    $u->make_options = [TemporaryEmailMakeOptions::class, 'call'];
    $u->make_request = [TemporaryEmailMakeRequest::class, 'call'];
    $u->make_response = [TemporaryEmailMakeResponse::class, 'call'];
    $u->make_result = [TemporaryEmailMakeResult::class, 'call'];
    $u->make_point = [TemporaryEmailMakePoint::class, 'call'];
    $u->make_spec = [TemporaryEmailMakeSpec::class, 'call'];
    $u->make_url = [TemporaryEmailMakeUrl::class, 'call'];
    $u->param = [TemporaryEmailParam::class, 'call'];
    $u->prepare_auth = [TemporaryEmailPrepareAuth::class, 'call'];
    $u->prepare_body = [TemporaryEmailPrepareBody::class, 'call'];
    $u->prepare_headers = [TemporaryEmailPrepareHeaders::class, 'call'];
    $u->prepare_method = [TemporaryEmailPrepareMethod::class, 'call'];
    $u->prepare_params = [TemporaryEmailPrepareParams::class, 'call'];
    $u->prepare_path = [TemporaryEmailPreparePath::class, 'call'];
    $u->prepare_query = [TemporaryEmailPrepareQuery::class, 'call'];
    $u->result_basic = [TemporaryEmailResultBasic::class, 'call'];
    $u->result_body = [TemporaryEmailResultBody::class, 'call'];
    $u->result_headers = [TemporaryEmailResultHeaders::class, 'call'];
    $u->transform_request = [TemporaryEmailTransformRequest::class, 'call'];
    $u->transform_response = [TemporaryEmailTransformResponse::class, 'call'];
});

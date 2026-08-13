# TemporaryEmail SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TemporaryEmailUtility.registrar = ->(u) {
  u.clean = TemporaryEmailUtilities::Clean
  u.done = TemporaryEmailUtilities::Done
  u.make_error = TemporaryEmailUtilities::MakeError
  u.feature_add = TemporaryEmailUtilities::FeatureAdd
  u.feature_hook = TemporaryEmailUtilities::FeatureHook
  u.feature_init = TemporaryEmailUtilities::FeatureInit
  u.fetcher = TemporaryEmailUtilities::Fetcher
  u.make_fetch_def = TemporaryEmailUtilities::MakeFetchDef
  u.make_context = TemporaryEmailUtilities::MakeContext
  u.make_options = TemporaryEmailUtilities::MakeOptions
  u.make_request = TemporaryEmailUtilities::MakeRequest
  u.make_response = TemporaryEmailUtilities::MakeResponse
  u.make_result = TemporaryEmailUtilities::MakeResult
  u.make_point = TemporaryEmailUtilities::MakePoint
  u.make_spec = TemporaryEmailUtilities::MakeSpec
  u.make_url = TemporaryEmailUtilities::MakeUrl
  u.param = TemporaryEmailUtilities::Param
  u.prepare_auth = TemporaryEmailUtilities::PrepareAuth
  u.prepare_body = TemporaryEmailUtilities::PrepareBody
  u.prepare_headers = TemporaryEmailUtilities::PrepareHeaders
  u.prepare_method = TemporaryEmailUtilities::PrepareMethod
  u.prepare_params = TemporaryEmailUtilities::PrepareParams
  u.prepare_path = TemporaryEmailUtilities::PreparePath
  u.prepare_query = TemporaryEmailUtilities::PrepareQuery
  u.graphql_body = TemporaryEmailUtilities::GraphqlBody
  u.graphql_errors = TemporaryEmailUtilities::GraphqlErrors
  u.result_basic = TemporaryEmailUtilities::ResultBasic
  u.result_body = TemporaryEmailUtilities::ResultBody
  u.result_headers = TemporaryEmailUtilities::ResultHeaders
  u.transform_request = TemporaryEmailUtilities::TransformRequest
  u.transform_response = TemporaryEmailUtilities::TransformResponse
}

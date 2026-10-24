# TemporaryEmail SDK utility: prepare_body
require_relative 'media'
module TemporaryEmailUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return TemporaryEmailUtilities.raw_body(ctx.reqdata) if TemporaryEmailUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end

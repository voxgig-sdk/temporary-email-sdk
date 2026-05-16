# TemporaryEmail SDK utility: make_context
require_relative '../core/context'
module TemporaryEmailUtilities
  MakeContext = ->(ctxmap, basectx) {
    TemporaryEmailContext.new(ctxmap, basectx)
  }
end

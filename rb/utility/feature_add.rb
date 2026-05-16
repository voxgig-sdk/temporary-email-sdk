# TemporaryEmail SDK utility: feature_add
module TemporaryEmailUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end

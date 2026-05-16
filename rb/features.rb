# TemporaryEmail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TemporaryEmailFeatures
  def self.make_feature(name)
    case name
    when "base"
      TemporaryEmailBaseFeature.new
    when "test"
      TemporaryEmailTestFeature.new
    else
      TemporaryEmailBaseFeature.new
    end
  end
end

# TemporaryEmail SDK exists test

require "minitest/autorun"
require_relative "../TemporaryEmail_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = TemporaryEmailSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end

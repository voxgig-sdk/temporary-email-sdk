# Message entity test

require "minitest/autorun"
require "json"
require_relative "../TemporaryEmail_sdk"
require_relative "runner"

class MessageEntityTest < Minitest::Test
  def test_create_instance
    testsdk = TemporaryEmailSDK.test(nil, nil)
    ent = testsdk.Message(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = message_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "message." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set TEMPORARYEMAIL_TEST_MESSAGE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    message_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.message")))
    message_ref01_data = nil
    if message_ref01_data_raw.length > 0
      message_ref01_data = Helpers.to_map(message_ref01_data_raw[0][1])
    end

    # LOAD
    message_ref01_ent = client.Message(nil)
    message_ref01_match_dt0 = {
      "id" => message_ref01_data["id"],
    }
    message_ref01_data_dt0_loaded, err = message_ref01_ent.load(message_ref01_match_dt0, nil)
    assert_nil err
    message_ref01_data_dt0_load_result = Helpers.to_map(message_ref01_data_dt0_loaded)
    assert !message_ref01_data_dt0_load_result.nil?
    assert_equal message_ref01_data_dt0_load_result["id"], message_ref01_data["id"]

  end
end

def message_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "message", "MessageTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = TemporaryEmailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["message01", "message02", "message03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["TEMPORARYEMAIL_TEST_MESSAGE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "TEMPORARYEMAIL_TEST_MESSAGE_ENTID" => idmap,
    "TEMPORARYEMAIL_TEST_LIVE" => "FALSE",
    "TEMPORARYEMAIL_TEST_EXPLAIN" => "FALSE",
    "TEMPORARYEMAIL_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["TEMPORARYEMAIL_TEST_MESSAGE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["TEMPORARYEMAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["TEMPORARYEMAIL_APIKEY"],
      },
      extra || {},
    ])
    client = TemporaryEmailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["TEMPORARYEMAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["TEMPORARYEMAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end

-- TemporaryEmail SDK error

local TemporaryEmailError = {}
TemporaryEmailError.__index = TemporaryEmailError


function TemporaryEmailError.new(code, msg, ctx)
  local self = setmetatable({}, TemporaryEmailError)
  self.is_sdk_error = true
  self.sdk = "TemporaryEmail"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TemporaryEmailError:error()
  return self.msg
end


function TemporaryEmailError:__tostring()
  return self.msg
end


return TemporaryEmailError

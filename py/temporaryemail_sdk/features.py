# TemporaryEmail SDK feature factory

from temporaryemail_sdk.feature.base_feature import TemporaryEmailBaseFeature
from temporaryemail_sdk.feature.ratelimit_feature import TemporaryEmailRatelimitFeature
from temporaryemail_sdk.feature.retry_feature import TemporaryEmailRetryFeature
from temporaryemail_sdk.feature.test_feature import TemporaryEmailTestFeature
from temporaryemail_sdk.feature.timeout_feature import TemporaryEmailTimeoutFeature


_FEATURES = {
    "base": lambda: TemporaryEmailBaseFeature(),
    "ratelimit": lambda: TemporaryEmailRatelimitFeature(),
    "retry": lambda: TemporaryEmailRetryFeature(),
    "test": lambda: TemporaryEmailTestFeature(),
    "timeout": lambda: TemporaryEmailTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES

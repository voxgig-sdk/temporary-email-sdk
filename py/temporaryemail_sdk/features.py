# TemporaryEmail SDK feature factory

from temporaryemail_sdk.feature.base_feature import TemporaryEmailBaseFeature
from temporaryemail_sdk.feature.test_feature import TemporaryEmailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TemporaryEmailBaseFeature(),
        "test": lambda: TemporaryEmailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

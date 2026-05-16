# ProjectName SDK exists test

import pytest
from temporaryemail_sdk import TemporaryEmailSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TemporaryEmailSDK.test(None, None)
        assert testsdk is not None

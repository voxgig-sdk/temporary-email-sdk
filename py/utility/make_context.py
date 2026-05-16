# TemporaryEmail SDK utility: make_context

from core.context import TemporaryEmailContext


def make_context_util(ctxmap, basectx):
    return TemporaryEmailContext(ctxmap, basectx)

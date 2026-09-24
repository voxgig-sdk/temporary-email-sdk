"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryEmailError = void 0;
class TemporaryEmailError extends Error {
    isTemporaryEmailError = true;
    sdk = 'TemporaryEmail';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TemporaryEmailError = TemporaryEmailError;
//# sourceMappingURL=TemporaryEmailError.js.map
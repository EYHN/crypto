(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../rng/prng"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const prng_1 = require("../rng/prng");
    function pkcs1padding(s, n) {
        if (n < s.byteLength + 11) {
            throw new Error("Message too long for RSA");
        }
        const random = new Uint8Array(n - s.byteLength - 3);
        const x = new Uint8Array(1);
        const rngfn = prng_1.default();
        for (let i = 0; i < random.length; i++) {
            x[0] = 0;
            while (x[0] == 0)
                rngfn(x);
            random[i] = x[0];
        }
        const ba = new Uint8Array(n);
        ba[0] = 0;
        ba[1] = 2;
        ba.set(random, 2);
        ba[random.length + 2] = 0;
        ba.set(s, random.length + 3);
        return ba;
    }
    exports.default = pkcs1padding;
});
//# sourceMappingURL=padding.js.map
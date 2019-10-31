import { TypedArray } from "../interface/TypedArray";
import * as crypto from 'crypto';

export default function prng(): (ba: TypedArray) => TypedArray {
  if (typeof window !=="undefined") {
    // Browser
    if (typeof window.crypto !== "undefined") {
      return (ba) => window.crypto.getRandomValues(ba);
    } else {
      return (ba) => {
        var l = ba.length
        while (l--) {
          ba[l] = Math.floor(Math.random() * 256)
        }
        return ba;
      }
    }
  } else {
    // Node.JS
    const nodecrypto: typeof crypto = require('crypto');
    return (ba) => nodecrypto.randomFillSync(ba);
  }
}

import { TypedArray } from "../interface/TypedArray";

export default function prng(): (ba: TypedArray) => void {
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
      }
    }
  } else {
    // Node.JS
    const crypto = require('crypto');
    return (ba) => crypto.randomFillSync(ba);
  }
}

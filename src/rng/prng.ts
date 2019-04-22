import { TypedArray } from "../interface/TypedArray";

export default function prng(): (ba: TypedArray) => void {
  if (typeof window !=="undefined") {
    return (ba) => window.crypto.getRandomValues(ba);
  } else {
    const crypto = require('crypto');
    return (ba) => crypto.randomFillSync(ba);
  }
}
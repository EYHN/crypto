import * as BigInt from "big-integer";

export function arrayBufferToBigInt(ba: ArrayBuffer) {
  let array = new Uint8Array(ba);
  return BigInt.fromArray(Array.from(array), 256);
}
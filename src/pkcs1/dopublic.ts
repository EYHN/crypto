import { arrayBufferToBigInt } from "../bigint";

export default function pkcs1dopublic(x: ArrayBuffer, n: ArrayBuffer, e: ArrayBuffer) {
  const xi = arrayBufferToBigInt(x);
  const ei = arrayBufferToBigInt(e);
  const ni = arrayBufferToBigInt(n);

  return new Uint8Array(xi.modPow(ei, ni).toArray(256).value);
}
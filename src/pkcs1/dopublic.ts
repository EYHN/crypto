import { arrayBufferToBigInt } from "../bigint";
import * as BigInt from "big-integer";

export default function pkcs1dopublic(x: ArrayBuffer, n: ArrayBuffer, e: BigInt.BigNumber) {
  const xi = arrayBufferToBigInt(x);
  const ni = arrayBufferToBigInt(n);

  return new Uint8Array(xi.modPow(e, ni).toArray(256).value).buffer;
}
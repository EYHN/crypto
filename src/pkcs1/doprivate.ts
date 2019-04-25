import { arrayBufferToBigInt } from "../bigint";

export default function pkcs1doprivate(d: ArrayBuffer, n: ArrayBuffer, data: ArrayBuffer) {
  const datai = arrayBufferToBigInt(data);
  const di = arrayBufferToBigInt(d);
  const ni = arrayBufferToBigInt(n);

  return new Uint8Array(datai.modPow(di, ni).toArray(256).value).buffer
}
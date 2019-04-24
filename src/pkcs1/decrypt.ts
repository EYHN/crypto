
import pkcs1doprivate from "./doprivate";
import pkcs1unpadding from "./unpadding";

export default function pkcs1decrypt(d: ArrayBuffer, n: ArrayBuffer, buffer: ArrayBuffer) {
  const m = pkcs1doprivate(d, n, buffer);
  return pkcs1unpadding(m, n.byteLength);;
}

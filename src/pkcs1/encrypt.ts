import pkcs1padding from "./padding";
import pkcs1dopublic from "./dopublic";

export default function pkcs1encrypt(buffer: ArrayBuffer, n: ArrayBuffer, e: ArrayBuffer) {
  let m = pkcs1padding(buffer, n.byteLength);
  let c = pkcs1dopublic(m, n, e);
  return c;
}
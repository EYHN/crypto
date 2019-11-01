import { mergeArrayBuffer } from "../utils/arraybuffer";
import sha256hmac from "../sha256/hmac";

export default function pbkdf2sha256(password: ArrayBuffer, salt: ArrayBuffer, iterations: number, len: number) {
  let out = new ArrayBuffer(0);
  var i, j;
  var num = 0;
  const block = mergeArrayBuffer(salt, new ArrayBuffer(4));
  const view = new DataView(block);
  while (out.byteLength < len) {
    num++;
    view.setUint32(salt.byteLength, num, false);
    let prev = sha256hmac(password, block);
    const md = new Uint8Array(prev);
    i = 0;
    while (++i < iterations) {
      prev = sha256hmac(password, prev);
      const me = new Uint8Array(prev);
      j = -1;
      while (++j < prev.byteLength) {
        md[j] ^= me[j]
      }
    }
    out = mergeArrayBuffer(out, md.buffer);
  }
  return out.slice(0, len);
}
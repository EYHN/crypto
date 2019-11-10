import { T1, T2, T3, T4, S } from "./constants";
import convertToInt32 from "./convertToInt32";

export default function aesencrypt(plaintext: ArrayBuffer, roundkey: number[][]): ArrayBuffer {
  plaintext = plaintext.slice(0);
  if (plaintext.byteLength != 16) {
    throw new Error('invalid plaintext size (must be 16 bytes)');
  }
  const Ke = roundkey;
  const rounds = Ke.length - 1;
  const a = [0, 0, 0, 0];

  // convert plaintext to (ints ^ key)
  let t = convertToInt32(plaintext);
  for (let i = 0; i < 4; i++) {
    t[i] ^= Ke[0][i];
  }

  // apply round transforms
  for (let r = 1; r < rounds; r++) {
    for (let i = 0; i < 4; i++) {
      a[i] = (T1[(t[i] >> 24) & 0xff] ^
        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
        T3[(t[(i + 2) % 4] >> 8) & 0xff] ^
        T4[t[(i + 3) % 4] & 0xff] ^
        Ke[r][i]);
    }
    t = a.slice();
  }

  const result = new Uint8Array(16);
  for (let i = 0; i < 4; i++) {
    const tt = Ke[rounds][i];
    result[4 * i] = (S[(t[i] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
    result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
    result[4 * i + 2] = (S[(t[(i + 2) % 4] >> 8) & 0xff] ^ (tt >> 8)) & 0xff;
    result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;
  }

  return result.buffer;
}
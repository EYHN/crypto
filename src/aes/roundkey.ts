import { numberOfRounds, S, rcon } from "./constants";
import convertToInt32 from "./convertToInt32";

export function aesEncryptionRoundKey(key: ArrayBuffer) {
  const rounds = numberOfRounds[key.byteLength];
  if (rounds == null) {
    throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
  }

  // encryption round keys
  const Ke = [];

  for (let i = 0; i <= rounds; i++) {
    Ke.push([0, 0, 0, 0]);
  }

  const roundKeyCount = (rounds + 1) * 4;
  const KC = key.byteLength / 4;

  // convert the key into ints
  const tk = convertToInt32(key);

  for (var i = 0; i < KC; i++) {
    Ke[i >> 2][i % 4] = tk[i];
  }

  let rconpointer = 0;
  let t = KC, tt;
  while (t < roundKeyCount) {
    tt = tk[KC - 1];
    tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
      (S[(tt >> 8) & 0xFF] << 16) ^
      (S[tt & 0xFF] << 8) ^
      S[(tt >> 24) & 0xFF] ^
      (rcon[rconpointer] << 24));
    rconpointer += 1;

    // key expansion (for non-256 bit)
    if (KC != 8) {
      for (let i = 1; i < KC; i++) {
        tk[i] ^= tk[i - 1];
      }

      // key expansion for 256-bit keys is "slightly different" (fips-197)
    } else {
      for (let i = 1; i < (KC / 2); i++) {
        tk[i] ^= tk[i - 1];
      }
      tt = tk[(KC / 2) - 1];

      tk[KC / 2] ^= (S[tt & 0xFF] ^
        (S[(tt >> 8) & 0xFF] << 8) ^
        (S[(tt >> 16) & 0xFF] << 16) ^
        (S[(tt >> 24) & 0xFF] << 24));

      for (var i = (KC / 2) + 1; i < KC; i++) {
        tk[i] ^= tk[i - 1];
      }
    }

    // copy values into round key arrays
    for (let i = 0; i < KC && t < roundKeyCount;) {
      Ke[t >> 2][t % 4] = tk[i++];
      t++;
    }
  }

  return Ke
}

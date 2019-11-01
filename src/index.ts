import pkcs1encrypt from "./pkcs1/encrypt";
import { hexToArrayBuffer, arrayBufferToHex } from "./utils/hex";
import { textToArrayBuffer, arrayBufferToText } from "./utils/text";
import pkcs1padding from "./pkcs1/padding";
import pkcs1unpadding from "./pkcs1/unpadding";
import pkcs1dopublic from "./pkcs1/dopublic";
import pkcs1doprivate from "./pkcs1/doprivate";
import pkcs1generate from "./pkcs1/generate";
import pkcs1decrypt from "./pkcs1/decrypt";
import pkcs1sign from "./pkcs1/sign";
import { arrayBufferToBigInt } from "./bigint";
import sha256 from "./sha256";
import pkcs1verify from "./pkcs1/verify";
import aesctrencrypt from "./aes/ctrencrypt";
import prng from "./rng/prng";
import pbkdf2sha256 from "./pbkdf2";
import sha256hmac from "./sha256/hmac";

export = {
  rsa: {
    decrypt: pkcs1decrypt,
    encrypt: pkcs1encrypt,
    padding: pkcs1padding,
    unpadding: pkcs1unpadding,
    dopublic: pkcs1dopublic,
    doprivate: pkcs1doprivate,
    generate: pkcs1generate,
    sign: pkcs1sign,
    verify: pkcs1verify
  },
  hash: {
    sha256: sha256
  },
  hmac: {
    sha256: sha256hmac
  },
  aes: {
    ctr: {
      encrypt: aesctrencrypt,
      decrypt: aesctrencrypt
    }
  },
  pbkdf2: {
    sha256: pbkdf2sha256
  },
  prng: prng,
  tools: {
    hexToArrayBuffer: hexToArrayBuffer,
    arrayBufferToHex: arrayBufferToHex,
    textToArrayBuffer: textToArrayBuffer,
    arrayBufferToText: arrayBufferToText,
    arrayBufferToBigInt: arrayBufferToBigInt
  }
}
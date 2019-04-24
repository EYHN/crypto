import pkcs1encrypt from "./pkcs1/encrypt";
import { hexToArrayBuffer, arrayBufferToHex } from "./utils/hex";
import { textToArrayBuffer, arrayBufferToText } from "./utils/text";
import pkcs1padding from "./pkcs1/padding";
import pkcs1unpadding from "./pkcs1/unpadding";
import pkcs1dopublic from "./pkcs1/dopublic";
import pkcs1doprivate from "./pkcs1/doprivate";
import pkcs1generate from "./pkcs1/generate";
import pkcs1decrypt from "./pkcs1/decrypt";
import { arrayBufferToBigInt } from "./bigint";

export = {
  rsa: {
    decrypt: pkcs1decrypt,
    encrypt: pkcs1encrypt,
    padding: pkcs1padding,
    unpadding: pkcs1unpadding,
    dopublic: pkcs1dopublic,
    doprivate: pkcs1doprivate,
    generate: pkcs1generate
  },
  tools: {
    hexToArrayBuffer: hexToArrayBuffer,
    arrayBufferToHex: arrayBufferToHex,
    textToArrayBuffer: textToArrayBuffer,
    arrayBufferToText: arrayBufferToText,
    arrayBufferToBigInt: arrayBufferToBigInt
  }
}
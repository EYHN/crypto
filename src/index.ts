import pkcs1encrypt from "./pkcs1/encrypt";
import { hexToArrayBuffer, arrayBufferToHex } from "./utils/hex";
import { textToArrayBuffer } from "./utils/text";
import pkcs1padding from "./pkcs1/padding";
import pkcs1unpadding from "./pkcs1/unpadding";
import pkcs1dopublic from "./pkcs1/dopublic";

export = {
  rsa: {
    encrypt: pkcs1encrypt,
    padding: pkcs1padding,
    unpadding: pkcs1unpadding,
    dopublic: pkcs1dopublic
  },
  tools: {
    hexToArrayBuffer: hexToArrayBuffer,
    arrayBufferToHex: arrayBufferToHex,
    textToArrayBuffer: textToArrayBuffer
  }
}
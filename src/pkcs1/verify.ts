import pkcs1dopublic from "./dopublic";
import { hexToArrayBuffer } from "../utils/hex";
import sha256 from "../sha256";
import { compareArrayBuffer } from "../utils/arraybuffer";
const DigestInfo = hexToArrayBuffer("3031300d060960864801650304020105000420")

export default function pkcs1verify(date: ArrayBuffer, sign: ArrayBuffer, n: ArrayBuffer, e: bigInt.BigNumber) {
  const decryptedSign = new Uint8Array(pkcs1dopublic(sign, n, e));
  if (compareArrayBuffer(decryptedSign.slice(0, DigestInfo.byteLength), DigestInfo)) {
    const hash = decryptedSign.slice(DigestInfo.byteLength);
    return compareArrayBuffer(sha256(date), hash);
  } else {
    return false;
  }
}
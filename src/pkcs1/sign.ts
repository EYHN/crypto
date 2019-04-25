import { hexToArrayBuffer } from '../utils/hex';
import pkcs1doprivate from './doprivate';
import sha256 from '../sha256';
import { mergeArrayBuffer } from '../utils/arraybuffer';
const DigestInfo = hexToArrayBuffer("3031300d060960864801650304020105000420")

function getPaddedDigestInfoHex(hash: ArrayBuffer, keyByteLength: number) {
  const head = hexToArrayBuffer("0001");

	
  const fLen = keyByteLength - head.byteLength - 1 - DigestInfo.byteLength - hash.byteLength;
  const mid = new Uint8Array(fLen);
  mid.fill(255);

	const padded = mergeArrayBuffer(head, mid, new Uint8Array([0]), DigestInfo, hash);
	return padded;
}

function signWithMessageHash(hash: ArrayBuffer, d: ArrayBuffer, n: ArrayBuffer) {
  const pm = getPaddedDigestInfoHex(hash, n.byteLength);
  const sign = pkcs1doprivate(d, n, pm);
  return sign;
}

export default function pkcs1sign(data: ArrayBuffer, d: ArrayBuffer, n: ArrayBuffer) {
  return signWithMessageHash(sha256(data), d, n);
}
import sha256 from ".";
import { mergeArrayBuffer } from "../utils/arraybuffer";

export default function sha256hmac(key: ArrayBuffer, data: ArrayBuffer){
  const blocksize = 64;
  let keyblock = new Uint8Array(blocksize)

	if(key.byteLength > blocksize){
    keyblock = new Uint8Array(sha256(key));
	} else if(key.byteLength < blocksize) {
    const keyview = new Uint8Array(key);
		for (var i = 0; i < keyview.length; i++) {
      keyblock[i] = keyview[i];
    }
	}
	var ipad = new Uint8Array(blocksize);
	var opad = new Uint8Array(blocksize);
	for (var i = 0; i < blocksize; i++) {
		ipad[i] = keyblock[i] ^ 0x36;
		opad[i] = keyblock[i] ^ 0x5C;
	}
	var ipad1 = mergeArrayBuffer(ipad, data);
	var opad1 = mergeArrayBuffer(opad, sha256(ipad1));
	return sha256(opad1);
}
const jssha256 = require('js-sha256');

export default function sha256(buf: ArrayBuffer): ArrayBuffer {
  return jssha256.arrayBuffer(buf)
}
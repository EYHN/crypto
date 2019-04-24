const jssha1 = require('js-sha1');

export default function sha1(buf: ArrayBuffer): ArrayBuffer {
  return jssha1.arrayBuffer(buf)
}
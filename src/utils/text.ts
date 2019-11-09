export function textToArrayBuffer(s: string) {
  var buf = new ArrayBuffer(s.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=s.length; i < strLen; i++) {
    bufView[i] = s.charCodeAt(i);
  }
  return buf;
}

export function arrayBufferToText(buffer: ArrayBuffer) {
  return String.fromCharCode.apply(null, new Uint16Array(buffer));
}
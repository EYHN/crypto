export function mergeArrayBuffer(...arrayBuffers: ArrayBuffer[]): ArrayBuffer {
  let totalLength = 0
  arrayBuffers.forEach(item => {
    totalLength += item.byteLength
  })

  const result = new Uint8Array(totalLength)
  let offset = 0
  arrayBuffers.forEach(item => {
    result.set(new Uint8Array(item), offset)
    offset += item.byteLength
  })

  return result.buffer
}

export function compareArrayBuffer(a: ArrayBuffer,b: ArrayBuffer) {
  if (a.byteLength !== b.byteLength) return false;
  const aView = new Uint8Array(a);
  const bview = new Uint8Array(b);
  let ok = true;
  for (let i = 0; i < aView.byteLength; i++) {
    if (aView[i] !== bview[i]) {
      ok = false;
    }
  }
  return ok;
}
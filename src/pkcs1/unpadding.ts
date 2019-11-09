export default function pkcs1unpadding(b: ArrayBuffer, n: number) {
  const view = new Uint8Array(b);
  let point = 0;
  while(point < view.byteLength && view[point] == 0) ++point;
  if(view.byteLength - point != n-1 || view[point] != 2)
    throw new Error('PKCS1 unpadding error.');
  ++point;
  while(view[point] != 0)
    if(++point >= view.length) return null;
  ++point;

  return view.slice(point).buffer;
}
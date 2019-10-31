export default function convertToInt32(data: ArrayBuffer) {
  const bytes = new Uint8Array(data);
  var result = [];
  for (var i = 0; i < bytes.length; i += 4) {
      result.push(
          (bytes[i    ] << 24) |
          (bytes[i + 1] << 16) |
          (bytes[i + 2] <<  8) |
           bytes[i + 3]
      );
  }
  return result;
}
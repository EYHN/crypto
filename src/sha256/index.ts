const K =
  [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

const INIT =
  new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);

const EXTRA = [-2147483648, 8388608, 32768, 128];

const SHIFT = [24, 16, 8, 0];

function block(blocks: number[], hash: Uint32Array, frist: boolean) {
  let h0 = hash[0], h1 = hash[1], h2 = hash[2], h3 = hash[3], h4 = hash[4], h5 = hash[5],
    h6 = hash[6], h7 = hash[7], j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;

  for (j = 16; j < 64; ++j) {
    // rightrotate
    t1 = blocks[j - 15];
    s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
    t1 = blocks[j - 2];
    s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
    blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
  }

  bc = h1 & h2;
  for (j = 0; j < 64; j += 4) {
    if (frist) {
      ab = 704751109;
      t1 = blocks[0] - 210244248;
      h7 = t1 - 1521486534 << 0;
      h3 = t1 + 143694565 << 0;
      
      frist = false;
    } else {
      s0 = ((h0 >>> 2) | (h0 << 30)) ^ ((h0 >>> 13) | (h0 << 19)) ^ ((h0 >>> 22) | (h0 << 10));
      s1 = ((h4 >>> 6) | (h4 << 26)) ^ ((h4 >>> 11) | (h4 << 21)) ^ ((h4 >>> 25) | (h4 << 7));
      ab = h0 & h1;
      maj = ab ^ (h0 & h2) ^ bc;
      ch = (h4 & h5) ^ (~h4 & h6);
      t1 = h7 + s1 + ch + K[j] + blocks[j];
      t2 = s0 + maj;
      h7 = h3 + t1 << 0;
      h3 = t1 + t2 << 0;
    }
    s0 = ((h3 >>> 2) | (h3 << 30)) ^ ((h3 >>> 13) | (h3 << 19)) ^ ((h3 >>> 22) | (h3 << 10));
    s1 = ((h7 >>> 6) | (h7 << 26)) ^ ((h7 >>> 11) | (h7 << 21)) ^ ((h7 >>> 25) | (h7 << 7));
    da = h3 & h0;
    maj = da ^ (h3 & h1) ^ ab;
    ch = (h7 & h4) ^ (~h7 & h5);
    t1 = h6 + s1 + ch + K[j + 1] + blocks[j + 1];
    t2 = s0 + maj;
    h6 = h2 + t1 << 0;
    h2 = t1 + t2 << 0;
    s0 = ((h2 >>> 2) | (h2 << 30)) ^ ((h2 >>> 13) | (h2 << 19)) ^ ((h2 >>> 22) | (h2 << 10));
    s1 = ((h6 >>> 6) | (h6 << 26)) ^ ((h6 >>> 11) | (h6 << 21)) ^ ((h6 >>> 25) | (h6 << 7));
    cd = h2 & h3;
    maj = cd ^ (h2 & h0) ^ da;
    ch = (h6 & h7) ^ (~h6 & h4);
    t1 = h5 + s1 + ch + K[j + 2] + blocks[j + 2];
    t2 = s0 + maj;
    h5 = h1 + t1 << 0;
    h1 = t1 + t2 << 0;
    s0 = ((h1 >>> 2) | (h1 << 30)) ^ ((h1 >>> 13) | (h1 << 19)) ^ ((h1 >>> 22) | (h1 << 10));
    s1 = ((h5 >>> 6) | (h5 << 26)) ^ ((h5 >>> 11) | (h5 << 21)) ^ ((h5 >>> 25) | (h5 << 7));
    bc = h1 & h2;
    maj = bc ^ (h1 & h3) ^ cd;
    ch = (h5 & h6) ^ (~h5 & h7);
    t1 = h4 + s1 + ch + K[j + 3] + blocks[j + 3];
    t2 = s0 + maj;
    h4 = h0 + t1 << 0;
    h0 = t1 + t2 << 0;
  }
  hash[0] = hash[0] + h0 << 0;
  hash[1] = hash[1] + h1 << 0;
  hash[2] = hash[2] + h2 << 0;
  hash[3] = hash[3] + h3 << 0;
  hash[4] = hash[4] + h4 << 0;
  hash[5] = hash[5] + h5 << 0;
  hash[6] = hash[6] + h6 << 0;
  hash[7] = hash[7] + h7 << 0;
}

export default function sha256(buf: ArrayBuffer): ArrayBuffer {
  const h = new Uint32Array(INIT);
  const blocks = new Array(17);
  blocks.fill(0,1,16);

  const bufview = new Uint8Array(buf);
  let index = 0, i = 0, hashed = false;
  while (index < buf.byteLength) {
    blocks.fill(0,1,16);

    for (i = 0; index < buf.byteLength && i < 64; index++) {
      blocks[i >> 2] |= bufview[index] << SHIFT[i++ & 3];
    }

    if (i >= 64) {
      block(blocks, h, !hashed);
      hashed = true;
    }
    if (index >= buf.byteLength) {
      blocks[i >> 2] |= EXTRA[i & 3];
      if (i >= 56) {
        if (i < 64) {
          block(blocks, h, !hashed);
          hashed = true;
        }
        blocks[0] = this.block;
        blocks.fill(0,1,16);
      }
      let bitLength = buf.byteLength * 8, hBitLength = 0;
      while (bitLength > 4294967295) {
        hBitLength += bitLength / 4294967296 << 0;
        bitLength = bitLength % 4294967296;
      }
      blocks[14] = hBitLength;
      blocks[15] = bitLength;
      block(blocks, h, !hashed);
      hashed = true;
    }
  }
  const dataView = new DataView(new ArrayBuffer(32))
  for (let i = 0; i < 8; i++) {
    dataView.setUint32(i * 4, h[i]);
  }
  return dataView.buffer;
}
import prng from "../rng/prng";

export default function pkcs1padding(s: ArrayBuffer, n: number) {
  if(n < s.byteLength + 11) {
    throw new Error("Message too long for RSA");
  }
  const random = new Uint8Array(n - s.byteLength - 3);
  const x = new Uint8Array(1);
  const rngfn = prng();
  for (let i = 0; i < random.length; i++) {
    x[0] = 0;
    while(x[0] == 0) rngfn(x);
    random[i] = x[0];
    
  }
  const ba = new Uint8Array(n)
  ba[0] = 0;
  ba[1] = 2;
  ba.set(random, 2);
  ba[random.byteLength + 2] = 0;
  ba.set(new Uint8Array(s), random.byteLength + 3);
  return ba;
}
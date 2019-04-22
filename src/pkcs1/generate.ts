import prng from "../rng/prng";
import * as BigInt from "big-integer";
import { TypedArray } from "../interface/TypedArray";
import { arrayBufferToBigInt } from "../bigint";

export function generateRandomBiting(bitlength: number, prng: (ba: TypedArray) => void): BigInt.BigInteger {
  const x = new Uint8Array(bitlength / 8 + 1), t = bitlength & 7;
  prng(x);
  if (t > 0)
    x[0] &= ((1 << t) - 1);
  else
    x[0] = 0;
  return arrayBufferToBigInt(x);
}

export function generatePrime(bitlength: number, prng: (ba: TypedArray) => void) {
  let bi = generateRandomBiting(bitlength, prng);
  bi = bi.or(BigInt.one.shiftLeft(bitlength - 1)) // force MSB set;
  if (bi.isEven()) bi = bi.add(BigInt.one);
  while (!bi.isProbablePrime(1)) {
    bi = bi.add(2);
    if (bi.bitLength().greater(bitlength)) bi = bi.subtract(BigInt.one.shiftLeft(bitlength - 1));
  }
  return bi;
}

export default function pkcs1generate(bitlength: number, expt: number) {
  const rng = prng();
  const qs = bitlength / 2;
  const ee = BigInt(expt);
  let p,q;
  while (true) {
    p = generatePrime(bitlength - qs, rng);
    if (BigInt.gcd(p.subtract(BigInt.one), ee).equals(BigInt.one) && p.isProbablePrime(10)) break;
  }
  while (true) {
    q = generatePrime(qs, rng);
    if (BigInt.gcd(q.subtract(BigInt.one), ee).equals(BigInt.one) && q.isProbablePrime(10)) break;
  }
  console.log(p.bitLength(),q.bitLength())
  if (p.lesserOrEquals(q)) {
    const t = p;
    p = q;
    q = t;
  }

  const p1 = p.subtract(BigInt.one);
  const q1 = q.subtract(BigInt.one);
  const phi = p1.multiply(q1);
  if(BigInt.gcd(phi, ee).equals(BigInt.one)) {
    const n = p.multiply(q);
    const d = ee.modInv(phi);
    const dmp1 = d.mod(p1);
    const dmq1 = d.mod(q1);
    const coeff = q.modInv(p);
    return {
      n: new Uint8Array(n.toArray(256).value),
      d: new Uint8Array(d.toArray(256).value),
      p: new Uint8Array(p.toArray(256).value),
      q: new Uint8Array(q.toArray(256).value),
      dmp1: new Uint8Array(dmp1.toArray(256).value),
      dmq1: new Uint8Array(dmq1.toArray(256).value),
      coeff: new Uint8Array(coeff.toArray(256).value)
    }
  }
}
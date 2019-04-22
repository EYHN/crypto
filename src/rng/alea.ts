import prng from "./prng";
import { TypedArray } from "../interface/TypedArray";

export default function Alea(seed?: string | number) {
  if (seed === undefined) {
    try {
      const seedba = new Uint8Array(256);
      prng()(seedba);
      seed = String.fromCharCode.apply(0, seedba);
    } catch (e) {
      seed = +new Date + Math.random();
    }
  }
  function Mash() {
    var n = 4022871197;
    return function (r: string) {
      for (var t, s, f, u = 0, e = 0.02519603282416938; u < r.length; u++)
        s = r.charCodeAt(u), f = (e * (n += s) - (n * e | 0)),
          n = 4294967296 * ((t = f * (e * n | 0)) - (t | 0)) + (t | 0);
      return (n | 0) * 2.3283064365386963e-10;
    }
  }
  return function () {
    var m = Mash(), a = m(" "), b = m(" "), c = m(" "), x = 1;
    seed = seed.toString(), a -= m(seed), b -= m(seed), c -= m(seed);
    a < 0 && a++ , b < 0 && b++ , c < 0 && c++;
    const fn = function () {
      var y = x * 2.3283064365386963e-10 + a * 2091639; a = b, b = c;
      return c = y - (x = y | 0);
    }
    return function (ba: TypedArray) {
      const ta = new Uint8Array(ba.buffer)
      for(let i = 0; i < ta.length; ++i) ta[i] = fn() * 256 & 0xff;
    };
  }();
}

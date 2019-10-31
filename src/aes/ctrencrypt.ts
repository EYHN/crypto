import { aesEncryptionRoundKey } from "./roundkey";
import aesencrypt from "./aesencrypt";
import Counter128bit from "./counter128bit";

export default function aesctrencrypt(key: ArrayBuffer, plaintext: ArrayBuffer, begin?: number): ArrayBuffer {
  const roundkey = aesEncryptionRoundKey(key);
  const encrypted = new Uint8Array(plaintext);
  const counter = new Counter128bit(begin);
  
  let remainingCounterIndex = 16, remainingCounter: Uint8Array;
  for (let i = 0; i < encrypted.length; i++) {
    if (remainingCounterIndex === 16) {
      remainingCounter = new Uint8Array(aesencrypt(counter._counter, roundkey));
      remainingCounterIndex = 0;
      counter.increment();
    }
    encrypted[i] ^= remainingCounter[remainingCounterIndex++];
  }

  return encrypted.buffer;
}
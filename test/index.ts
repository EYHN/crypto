import crypto = require('../src/');

describe('module', () => {
  it('should export something', () => {
    expect(!!crypto).toBe(true);
  });
})

describe('rsa', () => {
  it('padding', () => {
    const m = new Uint8Array(crypto.rsa.padding(new Uint8Array([1,2,3]), 30));
    expect(m.byteLength).toBe(30);
    expect(m[0]).toBe(0);
    expect(m[1]).toBe(2);
    for (let i = 2;i < 24 + 2;i++) {
      expect(m[i]).not.toBe(0);
    }
    expect(m[26]).toBe(0);
    expect(m[27]).toBe(1);
    expect(m[28]).toBe(2);
    expect(m[29]).toBe(3);
    expect(() => {
      crypto.rsa.padding(new Uint8Array([1,2,3]), 10);
    }).toThrow()
  });

  it('unpadding', () => {
    const data = new Uint8Array([1,2,3]);
    const m = new Uint8Array(crypto.rsa.padding(data, 30));
    const unpad = crypto.rsa.unpadding(m, 30);
    expect(data).toEqual(unpad)
    expect(() => {
      m[1] = 1;
      crypto.rsa.unpadding(m, 30);
    }).toThrow()
  });

  it('encrypt', () => {
    const ciphertext = crypto.tools.arrayBufferToHex(crypto.rsa.encrypt(
      crypto.tools.textToArrayBuffer('test'),
      crypto.tools.hexToArrayBuffer("a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3"),
      65537
    ));
    expect(ciphertext.length).toBe(256);
  });

  it('sign', () => {
    const sign = crypto.rsa.sign(
      new Uint8Array([1,2,3]),
      crypto.tools.hexToArrayBuffer("8e9912f6d3645894e8d38cb58c0db81ff516cf4c7e5a14c7f1eddb1459d2cded4d8d293fc97aee6aefb861859c8b6a3d1dfe710463e1f9ddc72048c09751971c4a580aa51eb523357a3cc48d31cfad1d4a165066ed92d4748fb6571211da5cb14bc11b6e2df7c1a559e6d5ac1cd5c94703a22891464fba23d0d965086277a161"),
      crypto.tools.hexToArrayBuffer("a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3"),
    )
    expect(sign.byteLength * 8).toBe(1024);
  });

  it('generate', () => {
    const rsa = crypto.rsa.generate(1024, 65537);
    expect(rsa.n.byteLength * 8).toBe(1024);
    expect(rsa.d.byteLength * 8).toBe(1024);
    expect(rsa.p.byteLength * 8).toBe(512);
    expect(rsa.q.byteLength * 8).toBe(512);
  });

  it('seed', () => {
    const rsa = crypto.rsa.generate(1024, 65537, 'seed');
    expect(rsa).toMatchSnapshot();
  });

  it('feature', () => {
    const rsa = crypto.rsa.generate(1024, 65537);
    const sourcestr = 'test';
    const ciphertext = crypto.rsa.encrypt(
      crypto.tools.textToArrayBuffer(sourcestr),
      rsa.n,
      65537
    );
    const plaintext = crypto.rsa.decrypt(
      rsa.d,
      rsa.n,
      ciphertext
    );
    const str = crypto.tools.arrayBufferToText(plaintext);
    expect(str).toBe(sourcestr);
  });
});

describe('sha1', () => {
  it('hash', () => {
    const hash = crypto.sha1(new Uint8Array([1,2,3]));
    expect(hash.byteLength).toBe(20);
    expect(hash).toMatchSnapshot();
  });
});

describe('sha256', () => {
  it('hash', () => {
    const hash = crypto.sha256(new Uint8Array([1,2,3]));
    expect(hash.byteLength).toBe(32);
    expect(hash).toMatchSnapshot();
  });
});

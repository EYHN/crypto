export default class Counter128bit {
  _counter = new Uint8Array(16);

  constructor(initialValue: number) {
    if (!(this instanceof Counter128bit)) {
      throw Error('Counter must be instanitated with `new`');
    }
  
    // We allow 0, but anything false-ish uses the default 1
    if (initialValue !== 0 && !initialValue) { initialValue = 1; }
  
    this.setValue(initialValue);
  }

  setValue(value: number) {
    if (typeof (value) !== 'number' || Math.floor(value) != value) {
      throw new Error('invalid counter value (must be an integer)');
    }
  
    // We cannot safely handle numbers beyond the safe range for integers
    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error('integer value out of safe range');
    }
  
    for (var index = 15; index >= 0; --index) {
      this._counter[index] = value % 256;
      value = Math.floor(value / 256);
    }
  }

  increment() {
    for (var i = 15; i >= 0; i--) {
      if (this._counter[i] === 255) {
        this._counter[i] = 0;
      } else {
        this._counter[i]++;
        break;
      }
    }
  }
}
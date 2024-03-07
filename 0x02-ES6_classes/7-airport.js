export default class Airport {
  constructor(name, code) {
    if ((typeof name !== 'string') && !(name instanceof String)) {
      throw new TypeError('Name must be a string');
    }
    if ((typeof code !== 'string') && !(code instanceof String)) {
      throw new TypeError('Code must be a string');
    }
    this._name = name;
    this._code = code;
  }

  get [Symbol.toStringTag]() {
    return this._code;
  }
}

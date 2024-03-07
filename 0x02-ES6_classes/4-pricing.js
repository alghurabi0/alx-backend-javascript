import Currency from './3-currency';

export default class Pricing {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  get amount() {
    return this._amount;
  }

  get currency() {
    return this._currency;
  }

  set amount(amount) {
    if ((typeof amount !== 'number') && !(amount instanceof Number)) {
      throw new TypeError('Amount must be a number');
    }
    this._amount = amount;
  }

  set currency(currency) {
    if (!(currency instanceof Currency)) {
      throw new TypeError('Currency must be a Currency');
    }
    this._currency = currency;
  }

  displayFullPrice() {
    return `${this._amount} ${this._currency.name} (${this._currency.code})`;
  }

  static convertPrice(amount, conversionRate) {
    if ((typeof amount !== 'number') && !(amount instanceof Number)) {
      throw new TypeError('Amount must be a number');
    }
    if ((typeof conversionRate !== 'number') && !(conversionRate instanceof Number)) {
      throw new TypeError('ConversionRate must be a number');
    }
    return amount * conversionRate;
  }
}

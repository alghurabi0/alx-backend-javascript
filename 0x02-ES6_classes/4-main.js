import Pricing from './4-pricing.js';
import Currency from './3-currency.js';

const c = new Currency("EUR", "Euro")
console.log(c);
const p = new Pricing(100, c)
console.log(p);

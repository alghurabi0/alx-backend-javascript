import Building from './5-building';

export default class SkyHighBuildingi extends Building {
  constructor(sqft, floors) {
    super(sqft);
    this.floors = floors;
  }

  get floors() {
    return this._floors;
  }

  set floors(floors) {
    if ((typeof floors !== 'number') && !(floors instanceof Number)) {
      throw new TypeError('Floors must be a number');
    }
    this._floors = floors;
  }

  evacuationWarningMessage() {
    return `Evacuate slowly the ${this._floors} floors`;
  }
}

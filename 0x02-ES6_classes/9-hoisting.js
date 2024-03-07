export class HolbertonClass {
  constructor(year, location) {
    this.year = year;
    this.location = location;
  }

  get year() {
    return this._year;
  }

  set year(year) {
    if (typeof year !== 'number') {
      throw new TypeError('Year must be a number');
    }
    this._year = year;
  }

  get location() {
    return this._location;
  }

  set location(location) {
    if (typeof location !== 'string') {
      throw new TypeError('Location must be a string');
    }
    this._location = location;
  }
}

export class StudentHolberton {
  constructor(firstName, lastName, holClass) {
    if (typeof firstName !== 'string') {
      throw new TypeError('First Name must be a string');
    }
    if (typeof lastName !== 'string') {
      throw new TypeError('Last Name must be a string');
    }
    if (!(holClass instanceof HolbertonClass)) {
      throw new TypeError('HolClass must be an instance of HolbertonClass');
    }
    this._firstName = firstName;
    this._lastName = lastName;
    this._holbertonClass = holClass;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  get holbertonClass() {
    return this._holbertonClass;
  }

  get fullStudentDescription() {
    return `${this._firstName} ${this._lastName} - ${this._holbertonClass.year} - ${this._holbertonClass.location}`;
  }
}

const class2019 = new HolbertonClass(2019, 'San Francisco');
const class2020 = new HolbertonClass(2020, 'San Francisco');

const student1 = new StudentHolberton('Guillaume', 'Salva', class2020);
const student2 = new StudentHolberton('John', 'Doe', class2020);
const student3 = new StudentHolberton('Albert', 'Clinton', class2019);
const student4 = new StudentHolberton('Donald', 'Bush', class2019);
const student5 = new StudentHolberton('Jason', 'Sandler', class2019);

const listOfStudents = [student1, student2, student3, student4, student5];
export default listOfStudents;

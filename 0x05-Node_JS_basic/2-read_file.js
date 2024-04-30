const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const lines = data.trim().split('\n').filter((line) => line.trim() !== '');

    const counters = {};

    for (const line of lines) {
      const [firstname, , , field] = line.split(',');
      if (field !== 'field') {
        if (!counters[field]) {
          counters[field] = [];
        }
        counters[field].push(firstname);
      }
    }

    console.log(`Number of students: ${lines.length - 1}`);

    for (const field of Object.keys(counters)) {
      const numStudents = counters[field].length;
      const list = counters[field].join(', ');
      console.log(`Number of students in ${field}: ${numStudents}. List: ${list}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

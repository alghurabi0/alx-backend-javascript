const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

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

      console.log(`Number of students: ${lines.length - 1}`); // Subtract 1 for the header line

      for (const field of Object.keys(counters)) {
        const numStudents = counters[field].length;
        const list = counters[field].join(', ');
        console.log(`Number of students in ${field}: ${numStudents}. List: ${list}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;

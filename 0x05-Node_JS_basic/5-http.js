const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const server = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

function sendResponse(res, responseText) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);
  res.statusCode = 200;
  res.write(Buffer.from(responseText));
  res.end();
}

const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const reportParts = [];
    const lines = data.toString('utf-8').trim().split('\n');
    const groups = {};
    const fieldNames = lines[0].split(',');
    const propNames = fieldNames.slice(0, fieldNames.length - 1);

    for (const line of lines.slice(1)) {
      const record = line.split(',');
      const propValues = record.slice(0, record.length - 1);
      const field = record[record.length - 1];

      if (!groups[field]) {
        groups[field] = [];
      }

      const entries = propNames.map((name, idx) => [name, propValues[idx]]);
      groups[field].push(Object.fromEntries(entries));
    }

    const totalStudents = Object.values(groups).reduce((prev, cur) => prev + cur.length, 0);
    reportParts.push(`Number of students: ${totalStudents}`);

    for (const [field, group] of Object.entries(groups)) {
      reportParts.push([
        `Number of students in ${field}: ${group.length}.`,
        'List:',
        group.map((student) => student.firstname).join(', '),
      ].join(' '));
    }

    resolve(reportParts.join('\n'));
  });
});

const routeHandlers = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';
      sendResponse(res, responseText);
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];
      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          sendResponse(res, responseParts.join('\n'));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          sendResponse(res, responseParts.join('\n'));
        });
    },
  },
];

server.on('request', (req, res) => {
  for (const { route, handler } of routeHandlers) {
    if (route === req.url) {
      handler(req, res);
      break;
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening at -> http://${HOST}:${PORT}`);
});

module.exports = server;

const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.trim().split('\n');
    const header = lines.shift().split(',');
    header.pop();

    const studentGroups = {};
    lines.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      if (!studentGroups[field]) studentGroups[field] = [];
      studentGroups[field].push(firstname);
    });

    const reportParts = [
      `Number of students: ${lines.length}`,
      ...Object.entries(studentGroups).map(([field, students]) => (
        `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`
      )),
    ];

    resolve(reportParts.join('\n'));
  });
});

const routeHandlers = [
  {
    route: '/',
    handler: (_, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello Holberton School!');
    },
  },
  {
    route: '/students',
    handler: (_, res) => {
      countStudents(DB_FILE)
        .then((report) => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`This is the list of our students\n${report}`);
        })
        .catch((error) => {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`Error: ${error.message}\n`);
        });
    },
  },
];

const server = http.createServer((req, res) => {
  const routeHandler = routeHandlers.find((handler) => handler.route === req.url);
  if (!routeHandler) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Error</title></head><body><pre>Cannot GET ${req.url}</pre></body></html>`);
    return;
  }
  routeHandler.handler(req, res);
});

server.listen(PORT, HOST);

module.exports = server;

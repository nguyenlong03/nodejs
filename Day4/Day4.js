const http = require('http');


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is a GET request');
  } 
  else if (req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const data = {name : 'long', pasword : 123456}
    res.end(JSON.stringify(data));
  } 
  else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(3002, () => {
  console.log('✅ Server running at http://localhost:3002');
});
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Serve the HTML form
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
      <head>
        <meta charset="utf-8">
        <title>Prime Checker</title>
      </head>
      <body>
        <h1>Prime Checker</h1>
        <form method="post">
          <label for="number">Enter a number:</label>
          <input type="number" id="number" name="number">
          <button type="submit">Check</button>
        </form>
      </body>
      </html>
    `);
    res.end();
  } else if (req.url === '/' && req.method === 'POST') {
    // Process the form submission
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const number = parseInt(body.split('=')[1]);
      const isPrime = isNumberPrime(number);
      res.setHeader('Content-Type', 'text/html');
      res.write(`
        <html>
        <head>
          <meta charset="utf-8">
          <title>Prime Checker</title>
        </head>
        <body>
          <h1>Prime Checker</h1>
          <p>The number ${number} is ${isPrime ? 'prime' : 'not prime'}</p>
        </body>
        </html>
      `);
      res.end();
    });
  } else {
    // Serve a 404 error
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Helper function to check if a number is prime
function isNumberPrime(number) {
  if (number <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

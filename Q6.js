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
        <title>Fibonacci Calculator</title>
      </head>
      <body>
        <h1>Fibonacci Calculator</h1>
        <form method="post">
          <label for="number">Enter a number:</label>
          <input type="number" id="number" name="number">
          <button type="submit">Calculate</button>
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
      const fibonacciNumber = getNthFibonacciNumber(number);
      res.setHeader('Content-Type', 'text/html');
      res.write(`
        <html>
        <head>
          <meta charset="utf-8">
          <title>Fibonacci Calculator</title>
        </head>
        <body>
          <h1>Fibonacci Calculator</h1>
          <p>The ${number}${number % 10 === 1 && number !== 11 ? 'st' : number % 10 === 2 && number !== 12 ? 'nd' : number % 10 === 3 && number !== 13 ? 'rd' : 'th'} Fibonacci number is ${fibonacciNumber}</p>
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

// Helper function to get the nth Fibonacci number
function getNthFibonacciNumber(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    let a = 0;
    let b = 1;
    for (let i = 2; i <= n; i++) {
      const c = a + b;
      a = b;
      b = c;
    }
    return b;
  }
}

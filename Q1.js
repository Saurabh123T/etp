const express = require('express');
const app = express();

// Middleware function to perform arithmetic operations on the input number
const arithmeticMiddleware = (req, res, next) => {
  const inputNumber = parseInt(req.query.number);
  const increment = inputNumber + 1;
  const decrement = inputNumber - 1;
  const square = inputNumber * inputNumber;
  req.arithmeticResults = { increment, decrement, square };
  next();
};

// Route to handle GET requests to the home page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Arithmetic Operations</title>
      </head>
      <body>
        <h1>Perform Arithmetic Operations on a Number</h1>
        <form action="/calculate" method="GET">
          <label for="number">Enter a number:</label>
          <input type="number" id="number" name="number">
          <button type="submit" >Calculate</button>
        </form>
      </body>
    </html>
  `);
});

// Route to handle GET requests to the /calculate endpoint
app.get('/calculate', arithmeticMiddleware, (req, res) => {
  const { increment, decrement, square } = req.arithmeticResults;
  res.send(`
    <html>
      <head>
        <title>Arithmetic Results</title>
      </head>
      <body>
        <h1>Arithmetic Results</h1>
        <p>Input number: ${req.query.number}</p>
        <p>Increment: ${increment}</p>
        <p>Decrement: ${decrement}</p>
        <p>Square: ${square}</p>
        <a href="/">Back to Home</a>
      </body>
    </html>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Set a cookie with a given name and value
app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'Hello, World!');
  res.send('Cookie has been set');
});

// Clear a cookie with a given name
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('myCookie');
  res.send('Cookie has been cleared');
});

// Display the value of a cookie with a given name
app.get('/show-cookie', (req, res) => {
  const myCookie = req.cookies['myCookie'];
  if (myCookie) {
    res.send(`The value of myCookie is: ${myCookie}`);
  } else {
    res.send('No cookie found');
  }
});

// Serve an HTML file with buttons to set, clear, and show the cookie
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Cookie Example</title>
      </head>
      <body>
        <h1>Cookie Example</h1>
        <button onclick="setCookie()">Set Cookie</button>
        <button onclick="clearCookie()">Clear Cookie</button>
        <button onclick="showCookie()">Show Cookie</button>
        <div id="result"></div>
        <script>
          function setCookie() {
            fetch('/set-cookie')
              .then(response => response.text())
              .then(result => {
                console.log(result);
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }

          function clearCookie() {
            fetch('/clear-cookie')
              .then(response => response.text())
              .then(result => {
                console.log(result);
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }

          function showCookie() {
            fetch('/show-cookie')
              .then(response => response.text())
              .then(result => {
                const resultDiv = document.querySelector('#result');
                resultDiv.textContent = result;
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }
        </script>
      </body>
    </html>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

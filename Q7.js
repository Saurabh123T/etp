const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

let visitorCount = 0;

// Serve index.html on GET request to the root URL
app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<!DOCTYPE html>');
  res.write('<html>');
  res.write('<head>');
  res.write('<meta charset="utf-8">');
  res.write('<title>Student Details</title>');
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>Student Details Form</h1>');
  res.write('<form>');
  res.write('<label for="name">Name:</label>');
  res.write('<input type="text" id="name" name="name" required><br>');
  res.write('<label for="regNo">Registration Number:</label>');
  res.write('<input type="text" id="regNo" name="regNo" required><br>');
  res.write('<label for="rollNo">Roll Number:</label>');
  res.write('<input type="text" id="rollNo" name="rollNo" required><br>');
  res.write('<label for="mobile">Mobile Number:</label>');
  res.write('<input type="tel" id="mobile" name="mobile" required><br>');
  res.write('<label for="email">Email:</label>');
  res.write('<input type="email" id="email" name="email" required><br>');
  res.write('<input type="submit" value="Submit">');
  res.write('</form>');
  res.write('<script src="/socket.io/socket.io.js"></script>');
  res.write('<script>');
  res.write('const socket = io();');
  res.write('const form = document.querySelector("form");');
  res.write('form.addEventListener("submit", (event) => {');
  res.write('event.preventDefault();');
  res.write('const name = document.getElementById("name").value;');
  res.write('const regNo = document.getElementById("regNo").value;');
  res.write('const rollNo = document.getElementById("rollNo").value;');
  res.write('const mobile = document.getElementById("mobile").value;');
  res.write('const email = document.getElementById("email").value;');
  res.write('const data = { name, regNo, rollNo, mobile, email };');
  res.write('socket.emit("student details", data);');
  res.write('});');
  res.write('</script>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

// Handle new client connections
io.on('connection', (socket) => {
  // Increment visitor count
  visitorCount++;
  
  // Display visitor count in server console if it's odd
  if (visitorCount % 2 === 1) {
    console.log('Odd visitor count:', visitorCount);
  }

  // Handle student details request from client
  socket.on('student details', (data) => {
    console.log('Received student details:', data);
  });
});

// Start server
const port = 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

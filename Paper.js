const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set up middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Define a route to serve the HTML file
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Socket.IO Example</title>
      </head>
      <body>
        <h1>Socket.IO Example</h1>
        <p>Student Details:</p>
        <ul>
          <li>Name: Utkarsh</li>
          <li>Reg No.: 12008171</li>
          <li>Grade: A+</li>
        </ul>
        <p>Even Numbers:</p>
        <ul id="numbers"></ul>
        <script src="/socket.io/socket.io.js"></script>
        <script>
          const socket = io();

          socket.on('connect', () => {
            console.log('Client connected');

            // Send a request to the server to start the even numbers sequence
            socket.emit('startSequence');
          });

          socket.on('sequence', (number) => {
            console.log('Received number:', number);

            // Display the even number on the web page
            const numbersList = document.querySelector('#numbers');
            const listItem = document.createElement('li');
            listItem.textContent = number;
            numbersList.appendChild(listItem);
          });

          socket.on('disconnect', () => {
            console.log('Client disconnected');

            // Display a thank you message on the server console
            console.log('Thank you!');
          });
        </script>
      </body>
    </html>
  `);
});

// Define an event handler for the 'startSequence' event
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send the student details to the client
  console.log('Student Details:');
  console.log('- Name: Your Name');
  console.log('- Reg No.: Your Reg No.');
  console.log('- Grade: Your Grade');

  // Start the even numbers sequence
  let number = 0;
  const interval = setInterval(() => {
    number += 2;
    console.log('Sending number:', number);
    socket.emit('sequence', number);
  }, 2000);

  // Define an event handler for the 'disconnect' event
  socket.on('disconnect', () => {
    console.log('Client disconnected');

    // Stop the even numbers sequence
    clearInterval(interval);

    // Display a thank you message on the server console
    console.log('Thank you!');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});

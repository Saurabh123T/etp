const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log(`Received data from client: ${data}`);
    console.log('Student details:', data.toString());
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.write('Thank you for connecting to the server!\n');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

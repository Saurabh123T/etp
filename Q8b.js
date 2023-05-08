const net = require('net');

const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server');

  const studentDetails = {
    name: 'John Doe',
    regNo: '123456',
    rollNo: 'B123',
    mobileNo: '9876543210',
    email: 'johndoe@example.com'
  };

  client.write(JSON.stringify(studentDetails));
});

client.on('data', (data) => {
  console.log(`Received data from server: ${data}`);
  client.end();
});

client.on('end', () => {
  console.log('Disconnected from server');
});

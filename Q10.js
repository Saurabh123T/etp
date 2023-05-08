const fs = require('fs');

// Function to check if a number is prime or not
function isPrime(num) {
  for(let i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}

// Create a writable stream to the sample.txt file
const writeStream = fs.createWriteStream('sample.txt');

// Find prime numbers up to 100 and write to the file
for (let i = 2; i <= 100; i++) {
  if (isPrime(i)) {
    writeStream.write(i + '\n');
  }
}

// Display message in console when task is completed
writeStream.on('finish', () => {
  console.log('Task completed');
});

// End the writable stream
writeStream.end();

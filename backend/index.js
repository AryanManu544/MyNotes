const express = require('express');
const connectToMongo = require('./db');
const app = express();
const port = 4000;

// Middleware to parse JSON request bodies
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/notes', require('./routes/notes')); 

connectToMongo();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

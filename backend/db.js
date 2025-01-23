const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://aryanmanu544:ary1nay2@aryanmanu.pvkla.mongodb.net/MyNotes?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    throw error; 
  }
};

module.exports = connectToMongo;

const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connection established successfully');
  } catch (err) {
    console.error(err.message);

    // Exit the process on failure or error
    process.exit(1);
  }
};

module.exports = connectDB;
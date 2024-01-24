const mongoose = require('mongoose')
require('dotenv').config();

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Successfully connected to database port=${process.env.PORT}`);
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
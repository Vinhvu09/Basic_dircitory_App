const mongoose = require("mongoose");
const DB_String = process.env.MONGO_DB;

const connectDatabase = () => {
  const mongoDbUrl = DB_String;
  console.log(`Connecting to DB`);

  // Connecting to the database

  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit;
    });
};

module.exports = connectDatabase;

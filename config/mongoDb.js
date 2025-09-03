const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`CONNECTED TO MONGODB: ${conn?.connection?.db?.databaseName}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;

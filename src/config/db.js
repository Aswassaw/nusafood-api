const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("MongoDB Connected.");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectToDB };

const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// Connect to the database using mongoose
// MongoURI is found in default.json
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

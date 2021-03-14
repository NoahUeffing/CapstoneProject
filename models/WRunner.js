const mongoose = require("mongoose");

// Model used to create runner entries into the wrunners collection
const WRunnerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yr: {
    type: String,
  },
  town: {
    type: String,
  },
});

module.exports = mongoose.model("wrunner", WRunnerSchema);

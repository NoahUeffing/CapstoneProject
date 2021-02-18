const mongoose = require("mongoose");

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

const mongoose = require("mongoose");

// Model used to create player entries into the wvolleyplayers collection
const WVolleyPlayerSchema = mongoose.Schema({
  no: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  pos: {
    type: String,
  },
  yr: {
    type: String,
  },
  ht: {
    type: String,
  },
  town: {
    type: String,
  },
});

module.exports = mongoose.model("wvolleyPlayer", WVolleyPlayerSchema);

const mongoose = require("mongoose");

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

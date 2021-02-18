const mongoose = require("mongoose");

const WBasketPlayerSchema = mongoose.Schema({
  no: {
    type: Number,
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

module.exports = mongoose.model("wbasketPlayer", WBasketPlayerSchema);

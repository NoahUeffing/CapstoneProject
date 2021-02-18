const mongoose = require("mongoose");

const MBasketPlayerSchema = mongoose.Schema({
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

module.exports = mongoose.model("mbasketPlayer", MBasketPlayerSchema);

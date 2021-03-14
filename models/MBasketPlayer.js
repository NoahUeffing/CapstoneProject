const mongoose = require("mongoose");

// Model used to create player entries into the mbasketplayers collection
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

const mongoose = require("mongoose");

const WRugbyTeamSchema = mongoose.Schema({
  team: {
    type: String,
    required: true,
  },
  gp: {
    type: Number,
  },
  winLoss: {
    type: String,
  },
  pct: {
    type: Number,
  },
  gf: {
    type: Number,
  },
  ga: {
    type: Number,
  },
  l10: {
    type: String,
  },
  streak: {
    type: String,
  },
});

module.exports = mongoose.model("wrugbyTeam", WRugbyTeamSchema);

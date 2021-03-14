const mongoose = require("mongoose");

// Model used to create team entries into the msoccerteams collection
const MSoccerTeamSchema = mongoose.Schema({
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

module.exports = mongoose.model("msoccerTeam", MSoccerTeamSchema);

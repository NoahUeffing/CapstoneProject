// All routes for the /api/mhockeyTeams endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MHockeyTeam = require("../models/MHockeyTeam");

// @route   POST api/mhockeyTeams
// @desc    Add hockey stats
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var teamItem in req.body) {
    const { team, gp, winLoss, pct, gf, ga, l10, streak, pts } = req.body[
      teamItem
    ];
    try {
      mhockeyTeam = new MHockeyTeam({
        team,
        gp,
        winLoss,
        pct,
        gf,
        ga,
        l10,
        streak,
        pts,
      });
      mhockeyTeam.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Team stats saved");
});

// @route   GET api/mhockeyTeams
// @desc    Get Acadia hockey standings
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const standings = await MHockeyTeam.find().sort({ pct: "desc" });
    res.json(standings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mhockeyTeams
// @desc    Update Acadia Team Stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update hockey team");
});

// @route   DELETE api/mhockeyTeams
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MHockeyTeam.deleteMany({});
    res.send("Standings deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

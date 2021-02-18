// All routes for the /api/msoccerTeams endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MSoccerTeam = require("../models/MSoccerTeam");

// @route   POST api/msoccerTeams
// @desc    Add soccer stats
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var teamItem in req.body) {
    const { team, gp, winLoss, pct, gf, ga, l10, streak } = req.body[teamItem];
    try {
      msoccerTeam = new MSoccerTeam({
        team,
        gp,
        winLoss,
        pct,
        gf,
        ga,
        l10,
        streak,
      });
      msoccerTeam.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Team stats saved");
});

// @route   GET api/msoccerTeams
// @desc    Get Acadia soccer standings
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const standings = await MSoccerTeam.find().sort({ pct: "desc" });
    res.json(standings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/msoccerTeams
// @desc    Update Acadia Team Stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update soccer team");
});

// @route   DELETE api/msoccerTeams
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MSoccerTeam.deleteMany({});
    res.send("Standings deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

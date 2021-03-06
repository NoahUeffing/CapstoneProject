// All routes for the /api/mfootballTeams endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MFootballTeam = require("../models/MFootballTeam");

// @route   POST api/mfootballTeams
// @desc    Add football stats
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var teamItem in req.body) {
    const { team, gp, winLoss, pct, gf, ga, l10, streak } = req.body[teamItem];
    try {
      mfootballTeam = new MFootballTeam({
        team,
        gp,
        winLoss,
        pct,
        gf,
        ga,
        l10,
        streak,
      });
      mfootballTeam.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Team stats saved");
});

// @route   GET api/mfootballTeams
// @desc    Get an Acadia football stats
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const standings = await MFootballTeam.find().sort({ winLoss: "desc" });
    res.json(standings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mfootballTeams
// @desc    Update Acadia Team Stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update football team");
});

// @route   DELETE api/mfootballTeams
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MFootballTeam.deleteMany({});
    res.send("Standings deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

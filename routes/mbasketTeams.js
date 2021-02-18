// All routes for the /api/mbasketTeams endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MBasketTeam = require("../models/MBasketTeam");

// @route   POST api/mbasketTeams
// @desc    Add basketball stats
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
      mbasketTeam = new MBasketTeam({
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
      mbasketTeam.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Team stats saved");
});

// @route   GET api/mbasketTeams
// @desc    Get Acadia Basketball standings
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const standings = await MBasketTeam.find().sort({ pct: "desc" });
    res.json(standings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mbasketTeams
// @desc    Update Acadia Team Stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update basketball team");
});

// @route   DELETE api/mbasketTeams
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MBasketTeam.deleteMany({});
    res.send("Standings deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

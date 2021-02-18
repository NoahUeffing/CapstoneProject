// All routes for the /api/wbasketTeams endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WBasketTeam = require("../models/WBasketTeam");

// @route   POST api/wbasketTeams
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
      wbasketTeam = new WBasketTeam({
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
      wbasketTeam.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Team stats saved");
});

// @route   GET api/wbasketTeams
// @desc    Get Acadia Basketball standings
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const standings = await WBasketTeam.find().sort({ pct: "desc" });
    res.json(standings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wbasketTeams
// @desc    Update Acadia Team Stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update basketball team");
});

// @route   DELETE api/wbasketTeams
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WBasketTeam.deleteMany({});
    res.send("Standings deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

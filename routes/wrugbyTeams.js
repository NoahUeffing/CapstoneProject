// All routes for the /api/wrugbyTeams endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WRugbyTeam = require("../models/WRugbyTeam");

// @route   POST api/wrugbyTeams
// @desc    Add rugby stats
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var teamItem in req.body) {
    const { team, gp, winLoss, pct, gf, ga, l10, streak } = req.body[teamItem];
    try {
      wrugbyTeam = new WRugbyTeam({
        team,
        gp,
        winLoss,
        pct,
        gf,
        ga,
        l10,
        streak,
      });
      wrugbyTeam.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Team stats saved");
});

// @route   GET api/wrugbyTeams
// @desc    Get an Acadia rugby stats
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const standings = await WRugbyTeam.find().sort({ winLoss: "desc" });
    res.json(standings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wrugbyTeams
// @desc    Update Acadia Team Stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update rugby team");
});

// @route   DELETE api/wrugbyTeams
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WRugbyTeam.deleteMany({});
    res.send("Standings deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

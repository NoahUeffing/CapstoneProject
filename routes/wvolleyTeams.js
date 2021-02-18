// All routes for the /api/wvolleyTeams endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WVolleyTeam = require("../models/WVolleyTeam");

// @route   POST api/wvolleyTeams
// @desc    Add volley stats
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var teamItem in req.body) {
    const { team, gp, winLoss, pct, gf, ga, l10, streak } = req.body[teamItem];
    try {
      wvolleyTeam = new WVolleyTeam({
        team,
        gp,
        winLoss,
        pct,
        gf,
        ga,
        l10,
        streak,
      });
      wvolleyTeam.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Team stats saved");
});

// @route   GET api/wvolleyTeams
// @desc    Get an Acadia volley stats
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const standings = await WVolleyTeam.find().sort({ pct: "desc" });
    res.json(standings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wvolleyTeams
// @desc    Update Acadia Team Stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update volley team");
});

// @route   DELETE api/wvolleyTeams
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WVolleyTeam.deleteMany({});
    res.send("Standings deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

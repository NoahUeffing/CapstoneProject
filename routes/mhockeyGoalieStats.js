// All routes for the /api/mhockeyGoalieStats endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MHockeyGoalieStats = require("../models/MHockeyGoalieStats");

// @route   POST api/mhockeyGoalieStats
// @desc    Adds stats for goalies
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var statsItem in req.body) {
    const {
      Number,
      Player,
      Year,
      Position,
      GP,
      GS,
      Min,
      GA,
      GAA,
      SV,
      SVPCT,
      WIN,
      LOSS,
      TIE,
      WINPCT,
    } = req.body[statsItem];
    try {
      mgoalieStats = new MHockeyGoalieStats({
        Number,
        Player,
        Year,
        Position,
        GP,
        GS,
        Min,
        GA,
        GAA,
        SV,
        SVPCT,
        WIN,
        LOSS,
        TIE,
        WINPCT,
      });
      mgoalieStats.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Stats saved");
});

// @route   GET api/mhockeyGoalieStats
// @desc    Get Acadia hockey goalie stats
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const stats = await MHockeyGoalieStats.find().sort({ Number: "asc" });
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mhockeyGolaieStats
// @desc    Update Acadia hockey goalie stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia goalie stats");
});

// @route   DELETE api/mhockeyGoalieStats
// @desc    Delete Acadia goalie stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MHockeyGoalieStats.deleteMany({});
    res.send("Stats deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// All routes for the /api/mhockeyPlayerStats endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MHockeyPlayerStats = require("../models/MHockeyPlayerStats");

// @route   POST api/mhockeyPlayerStats
// @desc    Adds player stats for mens hockey
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
      Goals,
      Assists,
      PIM,
      Plus_Minus,
      PPG,
      SHG,
      ENG,
      GWG,
      GTG,
      Hat_Tricks,
      Shots,
      Points,
    } = req.body[statsItem];
    try {
      mplayerStats = new MHockeyPlayerStats({
        Number,
        Player,
        Year,
        Position,
        Goals,
        Assists,
        PIM,
        Plus_Minus,
        PPG,
        SHG,
        ENG,
        GWG,
        GTG,
        Hat_Tricks,
        Shots,
        Points,
      });
      mplayerStats.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Stats saved");
});

// @route   GET api/mhockeyPlayerStats
// @desc    Get Acadia hockey player stats
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const stats = await MHockeyPlayerStats.find().sort({ Number: "asc" });
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mhockeyPlayerStats
// @desc    Update Acadia hockey player stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia hockey player stats");
});

// @route   DELETE api/mhockeyPlayerStats
// @desc    Delete Acadia hockey player stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MHockeyPlayerStats.deleteMany({});
    res.send("Stats deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

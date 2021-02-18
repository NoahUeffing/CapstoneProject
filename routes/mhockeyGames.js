// All routes for the /api/mhockeyGames endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MHockeyGame = require("../models/MHockeyGame");

// @route   POST api/mhockeyGames
// @desc    Add a hockey game to schedule
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var gameItem in req.body) {
    const { date, homeAway, opponent, status, score } = req.body[gameItem];
    try {
      mhockeyGame = new MHockeyGame({
        date,
        homeAway,
        opponent,
        status,
        score,
      });
      mhockeyGame.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/mhockeyGames
// @desc    Get an Acadia hockey game
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await MHockeyGame.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mhockeyGames
// @desc    Update Acadia hockey games
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia hockey game");
});

// @route   DELETE api/mhockeyGames
// @desc    Delete Acadia hockey games
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MHockeyGame.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

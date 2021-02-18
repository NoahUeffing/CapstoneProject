// All routes for the /api/mfootballGames endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MFootballGame = require("../models/MFootballGame");

// @route   POST api/mfootballGames
// @desc    Add a football game to schedule
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var gameItem in req.body) {
    const { date, homeAway, opponent, status, liveLink } = req.body[gameItem];
    try {
      mfootballGame = new MFootballGame({
        date,
        homeAway,
        opponent,
        status,
        liveLink,
      });
      mfootballGame.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/mfootballGames
// @desc    Get an Acadia football game
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await MFootballGame.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mfootballGames
// @desc    Update Acadia footbal games
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia football game");
});

// @route   DELETE api/mfootballGames
// @desc    Delete Acadia footbal games
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MFootballGame.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

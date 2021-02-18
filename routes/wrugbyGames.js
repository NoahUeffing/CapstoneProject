// All routes for the /api/wrugbyGames endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WRugbyGame = require("../models/WRugbyGame");

// @route   POST api/wrugbyGames
// @desc    Add a rugby game to schedule
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var gameItem in req.body) {
    const { date, homeAway, opponent, status, result } = req.body[gameItem];
    try {
      wrugbyGame = new WRugbyGame({
        date,
        homeAway,
        opponent,
        status,
        result,
      });
      wrugbyGame.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/wrugbyGames
// @desc    Get an Acadia rugby game
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await WRugbyGame.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wrugbyGames
// @desc    Update Acadia rugby games
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia rugby game");
});

// @route   DELETE api/wrugbyGames
// @desc    Delete Acadia rugby games
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WRugbyGame.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

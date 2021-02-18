// All routes for the /api/wsoccerGames endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WSoccerGame = require("../models/WSoccerGame");

// @route   POST api/wsoccerGames
// @desc    Add a soccer game to schedule
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var gameItem in req.body) {
    const { date, homeAway, opponent, status, result } = req.body[gameItem];
    try {
      wsoccerGame = new WSoccerGame({
        date,
        homeAway,
        opponent,
        status,
        result,
      });
      wsoccerGame.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/wsoccerGames
// @desc    Get an Acadia soccer game
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await WSoccerGame.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wsoccerGames
// @desc    Update Acadia soccer games
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia soccer game");
});

// @route   DELETE api/wsoccerGames
// @desc    Delete Acadia soccer games
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WSoccerGame.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

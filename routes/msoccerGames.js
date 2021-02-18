// All routes for the /api/msoccerGames endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MSoccerGame = require("../models/MSoccerGame");

// @route   POST api/msoccerGames
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
      msoccerGame = new MSoccerGame({
        date,
        homeAway,
        opponent,
        status,
        result,
      });
      msoccerGame.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/msoccerGames
// @desc    Get an Acadia soccer game
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await MSoccerGame.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/msoccerGames
// @desc    Update Acadia soccer games
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia soccer game");
});

// @route   DELETE api/msoccerGames
// @desc    Delete Acadia soccer games
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MSoccerGame.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

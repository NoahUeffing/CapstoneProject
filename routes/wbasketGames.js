// All routes for the /api/wbasketGames endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WBasketGame = require("../models/WBasketGame");

// @route   POST api/wbasketGames
// @desc    Add a basketball game to schedule
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var gameItem in req.body) {
    const { date, homeAway, opponent, status, score } = req.body[gameItem];
    try {
      wbasketGame = new WBasketGame({
        date,
        homeAway,
        opponent,
        status,
        score,
      });
      wbasketGame.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/wbasketGames
// @desc    Get an Acadia basketball game
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await WBasketGame.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wbasketGames
// @desc    Update Acadia basketball games
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia basketball game");
});

// @route   DELETE api/wbasketGames
// @desc    Delete Acadia basketball games
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WBasketGame.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

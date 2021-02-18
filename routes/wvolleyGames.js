// All routes for the /api/wvolleyGames endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WVolleyGame = require("../models/WVolleyGame");

// @route   POST api/wvolleyGames
// @desc    Add a volley game to schedule
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var gameItem in req.body) {
    const { date, homeAway, opponent, status, result } = req.body[gameItem];
    try {
      wvolleyGame = new WVolleyGame({
        date,
        homeAway,
        opponent,
        status,
        result,
      });
      wvolleyGame.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/wvoleyGames
// @desc    Get an Acadia volley game
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await WVolleyGame.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wvolleyGames
// @desc    Update Acadia volley games
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia rugby game");
});

// @route   DELETE api/wvolleyGames
// @desc    Delete Acadia volley games
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WVolleyGame.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

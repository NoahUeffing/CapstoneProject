// All routes for the /api/mbasketShootingStats endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MBasketShootingStats = require("../models/MBasketShootingStats");

// @route   POST api/mbasketShootingStats
// @desc    Adds shooting stats for mens basketball
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
      MPG,
      FG_G,
      PCT,
      THREE_PT_G,
      TP_PCT,
      FT_G,
      FTP,
      PPG,
    } = req.body[statsItem];
    try {
      mshootingStats = new MBasketShootingStats({
        Number,
        Player,
        Year,
        Position,
        GP,
        GS,
        MPG,
        FG_G,
        PCT,
        THREE_PT_G,
        TP_PCT,
        FT_G,
        FTP,
        PPG,
      });
      mshootingStats.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Stats saved");
});

// @route   GET api/mbasketShootingStats
// @desc    Get Acadia basketball shooting stats
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const stats = await MBasketShootingStats.find().sort({ Number: "asc" });
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mbasketShootingStats
// @desc    Update Acadia basketball shooting stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia basketball shooting stats");
});

// @route   DELETE api/mbasketShootingStats
// @desc    Delete Acadia basketball shooting stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MBasketShootingStats.deleteMany({});
    res.send("Stats deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

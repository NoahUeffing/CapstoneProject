// All routes for the /api/mbasketControlStats endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MBasketControlStats = require("../models/MBasketControlStats");

// @route   POST api/mbasketControlStats
// @desc    Adds control stats for mens basketball
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
      OFF_G,
      DEF_G,
      REB_G,
      PF_G,
      DQ_G,
      AST_G,
      TO_G,
      A_TO,
      STL_G,
      BLK_G,
    } = req.body[statsItem];
    try {
      mcontrolStats = new MBasketControlStats({
        Number,
        Player,
        Year,
        Position,
        GP,
        GS,
        MPG,
        OFF_G,
        DEF_G,
        REB_G,
        PF_G,
        DQ_G,
        AST_G,
        TO_G,
        A_TO,
        STL_G,
        BLK_G,
      });
      mcontrolStats.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Stats saved");
});

// @route   GET api/mbasketControlStats
// @desc    Get Acadia basketball control stats
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const stats = await MBasketControlStats.find().sort({ Number: "asc" });
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mbasketControlStats
// @desc    Update Acadia basketball control stats
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia basketball control stats");
});

// @route   DELETE api/mbasketControlStats
// @desc    Delete Acadia basketball control stats
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MBasketControlStats.deleteMany({});
    res.send("Stats deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

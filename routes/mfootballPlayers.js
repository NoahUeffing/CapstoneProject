// All routes for the /api/mfootballPlayers endpoint
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const MFootballPlayer = require("../models/MFootballPlayer");

// @route   POST api/mfootballPlayers
// @desc    Add a Acadia football player
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var playerItem in req.body) {
    const { no, name, pos, yr, ht, wt, town } = req.body[playerItem];
    try {
      mfootballPlayer = new MFootballPlayer({
        no,
        name,
        pos,
        yr,
        ht,
        wt,
        town,
      });
      mfootballPlayer.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/mfootballPlayers
// @desc    Get an Acadia football player
// @acess   Public
router.get("/", (req, res) => {
  res.send("Get Acadia football player");
});

// @route   PUT api/mfootballPlayers
// @desc    Update the Acadia football roster
// @acess   Public
router.put("/", (req, res) => {
  res.send("Update Acadia football player");
});

// @route   DELETE api/mfootballPlayers
// @desc    DELETE the Acadia football roster
// @acess   Public
router.delete("/", (req, res) => {
  res.send("DELETE Acadia football player");
});

module.exports = router;

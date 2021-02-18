// All routes for the /api/mhockeyPlayers endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MHockeyPlayer = require("../models/MHockeyPlayer");

// @route   POST api/mhockeyPlayers
// @desc    Add an Acadia hockey player
// @acess   Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var playerItem in req.body) {
    const { no, name, pos, yr, ht, major, town } = req.body[playerItem];
    try {
      mhockeyPlayer = new MHockeyPlayer({
        no,
        name,
        pos,
        yr,
        ht,
        major,
        town,
      });
      await mhockeyPlayer.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/mhockeyPlayers
// @desc    Get an Acadia hockey player
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const roster = await MHockeyPlayer.find().sort({ no: "asc" });
    res.json(roster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/mhockeyPlayers
// @desc    Update the Acadia football roster
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia hockey roster");
});

// @route   DELETE api/mhockeyPlayers
// @desc    DELETE the Acadia hockey roster
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MHockeyPlayer.deleteMany({});
    res.send("Roster deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

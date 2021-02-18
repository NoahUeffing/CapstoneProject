// All routes for the /api/mwoccerPlayers endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WSoccerPlayer = require("../models/WSoccerPlayer");

// @route   POST api/wsoccerPlayers
// @desc    Add an Acadia soccer player
// @acess   Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var playerItem in req.body) {
    const { no, name, pos, yr, town } = req.body[playerItem];
    try {
      wsoccerPlayer = new WSoccerPlayer({
        no,
        name,
        pos,
        yr,
        town,
      });
      await wsoccerPlayer.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/wsoccerPlayers
// @desc    Get an Acadia soccer player
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const roster = await WSoccerPlayer.find().sort({ no: "asc" });
    res.json(roster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wsoccerPlayers
// @desc    Update the Acadia football roster
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia soccer roster");
});

// @route   DELETE api/wsoccerPlayers
// @desc    DELETE the Acadia soccer roster
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WSoccerPlayer.deleteMany({});
    res.send("Roster deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

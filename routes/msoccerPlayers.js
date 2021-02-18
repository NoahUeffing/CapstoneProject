// All routes for the /api/msoccerPlayers endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const MSoccerPlayer = require("../models/MSoccerPlayer");

// @route   POST api/msoccerPlayers
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
      msoccerPlayer = new MSoccerPlayer({
        no,
        name,
        pos,
        yr,
        town,
      });
      await msoccerPlayer.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/msoccerPlayers
// @desc    Get an Acadia soccer player
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const roster = await MSoccerPlayer.find().sort({ no: "asc" });
    res.json(roster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/msoccerPlayers
// @desc    Update the Acadia football roster
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia soccer roster");
});

// @route   DELETE api/msoccerPlayers
// @desc    DELETE the Acadia soccer roster
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await MSoccerPlayer.deleteMany({});
    res.send("Roster deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

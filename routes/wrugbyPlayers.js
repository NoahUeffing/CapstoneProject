// All routes for the /api/wrugbyPlayers endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WRugbyPlayer = require("../models/WRugbyPlayer");

// @route   POST api/wrugbyPlayers
// @desc    Add a Acadia rugby player
// @acess   Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var playerItem in req.body) {
    const { name, pos, yr, town } = req.body[playerItem];
    try {
      wrugbyPlayer = new WRugbyPlayer({
        name,
        pos,
        yr,
        town,
      });
      await wrugbyPlayer.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/wrugbyPlayers
// @desc    Get an Acadia rugby player
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const roster = await WRugbyPlayer.find().sort({ name: "asc" });
    res.json(roster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wrugbyPlayers
// @desc    Update the Acadia rugby roster
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia rugby roster");
});

// @route   DELETE api/wrugbyPlayers
// @desc    DELETE the Acadia rugby roster
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WRugbyPlayer.deleteMany({});
    res.send("Roster deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

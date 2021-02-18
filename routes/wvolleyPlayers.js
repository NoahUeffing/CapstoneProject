// All routes for the /api/wvolleyPlayers endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WVolleyPlayer = require("../models/WVolleyPlayer");

// @route   POST api/wvolleyPlayers
// @desc    Add a Acadia volley player
// @acess   Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var playerItem in req.body) {
    const { no, name, pos, yr, ht, town } = req.body[playerItem];
    try {
      wvolleyPlayer = new WVolleyPlayer({
        no,
        name,
        pos,
        yr,
        ht,
        town,
      });
      await wvolleyPlayer.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/wvolleyPlayers
// @desc    Get an Acadia volley player
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const roster = await WVolleyPlayer.find().sort({ no: "asc" });
    res.json(roster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wvolleyPlayers
// @desc    Update the Acadia volley roster
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia volley roster");
});

// @route   DELETE api/wvolleyPlayers
// @desc    DELETE the Acadia volley roster
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WVolleyPlayer.deleteMany({});
    res.send("Roster deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

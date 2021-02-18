// All routes for the /api/wbasketPlayers endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WBasketPlayer = require("../models/WBasketPlayer");

// @route   POST api/wbasketPlayers
// @desc    Add an Acadia basketball player
// @acess   Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var playerItem in req.body) {
    const { no, name, pos, yr, ht, town } = req.body[playerItem];
    try {
      wbasketPlayer = new WBasketPlayer({
        no,
        name,
        pos,
        yr,
        ht,
        town,
      });
      await wbasketPlayer.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/wbasketPlayers
// @desc    Get an Acadia basket player
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const roster = await WBasketPlayer.find().sort({ no: "asc" });
    res.json(roster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wbasketPlayers
// @desc    Update the Acadia football roster
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia basketball roster");
});

// @route   DELETE api/wbasketPlayers
// @desc    DELETE the Acadia basketball roster
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WBasketPlayer.deleteMany({});
    res.send("Roster deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

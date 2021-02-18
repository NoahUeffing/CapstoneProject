// All routes for the /api/swimmers endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const Swimmer = require("../models/Swimmer");

// @route   POST api/swimmers
// @desc    Add an Acadia swimmer
// @acess   Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var playerItem in req.body) {
    const { name, yr, club, town } = req.body[playerItem];
    try {
      swimmer = new Swimmer({
        name,
        yr,
        club,
        town,
      });
      await swimmer.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/swimmers
// @desc    Get an Acadia swimmer
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const roster = await Swimmer.find().sort({ name: "asc" });
    res.json(roster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/swimmers
// @desc    Update the Acadia swimming roster
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia swimming roster");
});

// @route   DELETE api/swimmers
// @desc    DELETE the Acadia swimming roster
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await Swimmer.deleteMany({});
    res.send("Roster deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

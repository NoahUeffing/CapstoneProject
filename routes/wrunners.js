// All routes for the /api/wrunners endpoint
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WRunner = require("../models/WRunner");

// @route   POST api/wrunners
// @desc    Add an Acadia runner
// @acess   Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var playerItem in req.body) {
    const { name, yr, town } = req.body[playerItem];
    try {
      runner = new WRunner({
        name,
        yr,
        town,
      });
      await runner.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Roster saved");
});

// @route   GET api/wrunner
// @desc    Get an Acadia runner
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const roster = await WRunner.find().sort({ name: "asc" });
    res.json(roster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wrunner
// @desc    Update the Acadia running roster
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia running roster");
});

// @route   DELETE api/wrunner
// @desc    DELETE the Acadia running roster
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WRunner.deleteMany({});
    res.send("Roster deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

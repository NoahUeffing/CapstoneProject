// All routes for the /api/mfootballSchedule endpoint
const express = require("express");
const router = express.Router();

// @route   POST api/mfootballSchedule
// @desc    Add a football game to schedule
// @acess   Public
router.post("/", (req, res) => {
  res.send("Add a football schedule");
});

// @route   GET api/mfootballSchedule
// @desc    Get an Acadia football game
// @acess   Public
router.get("/", (req, res) => {
  res.send("Get Acadia football games");
});

// @route   PUT api/mfootballSchedule
// @desc    Update Acadia footbal games
// @acess   Public
router.put("/", (req, res) => {
  res.send("Update Acadia football games");
});

// @route   DELETE api/mfootballSchedule
// @desc    Delete Acadia footbal games
// @acess   Public
router.delete("/", (req, res) => {
  res.send("Delete Acadia football games");
});

module.exports = router;

// All routes for the /api/footballSchedule endpoint
const express = require("express");
const router = express.Router();

// @route   POST api/footballSchedule
// @desc    Add a football game to schedule
// @acess   Public
router.post("/", (req, res) => {
  res.send("Add a football schedule");
});

// @route   GET api/footballSchedule
// @desc    Get an Acadia football game
// @acess   Public
router.get("/", (req, res) => {
  res.send("Get Acadia football games");
});

// @route   PUT api/footballSchedule
// @desc    Update Acadia footbal games
// @acess   Public
router.put("/", (req, res) => {
  res.send("Update Acadia football games");
});

// @route   DELETE api/footballSchedule
// @desc    Delete Acadia footbal games
// @acess   Public
router.delete("/", (req, res) => {
  res.send("Delete Acadia football games");
});

module.exports = router;

// All routes for the /api/mfootballTeamStats endpoint
const express = require("express");
const router = express.Router();

// @route   POST api/mfootballTeamStats
// @desc    Add football stats
// @acess   Public
router.post("/", (req, res) => {
  res.send("Add football stats");
});

// @route   GET api/mfootballTeamStats
// @desc    Get an Acadia football stats
// @acess   Public
router.get("/", (req, res) => {
  res.send("Get Acadia football stats");
});

// @route   PUT api/mfootballTeamStats
// @desc    Update Acadia Team Stats
// @acess   Public
router.put("/", (req, res) => {
  res.send("Update Acadia football stats");
});

// @route   DELETE api/mfootballTeamStats
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", (req, res) => {
  res.send("Delete Acadia football stats");
});

module.exports = router;

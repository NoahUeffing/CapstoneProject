// All routes for the /api/footballTeamStats endpoint
const express = require("express");
const router = express.Router();

// @route   POST api/footballTeamStats
// @desc    Add football stats
// @acess   Public
router.post("/", (req, res) => {
  res.send("Add football stats");
});

// @route   GET api/footballTeamStats
// @desc    Get an Acadia football stats
// @acess   Public
router.get("/", (req, res) => {
  res.send("Get Acadia football stats");
});

// @route   PUT api/footballTeamStats
// @desc    Update Acadia Team Stats
// @acess   Public
router.put("/", (req, res) => {
  res.send("Update Acadia football stats");
});

// @route   DELETE api/footballTeamStats
// @desc    DELETE Acadia Team Stats
// @acess   Public
router.delete("/", (req, res) => {
  res.send("Delete Acadia football stats");
});

module.exports = router;

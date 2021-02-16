// All routes for the /api/mfootballRoster endpoint
const express = require("express");
const router = express.Router();

// @route   POST api/mfootballRoster
// @desc    Add a Acadia football player
// @acess   Public
router.post("/", (req, res) => {
  res.send("Add the Acadia football roster");
});

// @route   GET api/mfootballRoster
// @desc    Get an Acadia football player
// @acess   Public
router.get("/", (req, res) => {
  res.send("Get Acadia football roster");
});

// @route   PUT api/mfootballRoster
// @desc    Update the Acadia football roster
// @acess   Public
router.put("/", (req, res) => {
  res.send("Update Acadia football roster");
});

// @route   DELETE api/mfootballRoster
// @desc    DELETE the Acadia football roster
// @acess   Public
router.delete("/", (req, res) => {
  res.send("DELETE Acadia football roster");
});

module.exports = router;

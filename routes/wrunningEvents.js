// All routes for the /api/wrunningEvents endpoint
// NOTE: Sorting by date for events is currently bugged as no year is included on the Acadia Athletics site
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const WRunningEvent = require("../models/WRunningEvent");

// @route   POST api/wrunningEvents
// @desc    Add a running event to the schedule
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var gameItem in req.body) {
    const { date, event, result, links } = req.body[gameItem];
    try {
      runningEvent = new WRunningEvent({
        date,
        event,
        result,
        links,
      });
      runningEvent.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/wrunningEvents
// @desc    Get a running event
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await WRunningEvent.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/wrunningEvents
// @desc    Update Acadia running events
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia running event");
});

// @route   DELETE api/wrunningEvents
// @desc    Delete Acadia running event
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await WRunningEvent.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

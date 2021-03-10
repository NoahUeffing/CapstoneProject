// All routes for the /api/swimmingEvents endpoint
// NOTE: Sorting by date for events is currently bugged as no year is included on the Acadia Athletics site
const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const SwimmingEvent = require("../models/SwimmingEvent");

// @route   POST api/swimmingEvents
// @desc    Add a swimming event to the schedule
// @acess   Public
router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  for (var gameItem in req.body) {
    const { date, teams, notes, event, results } = req.body[gameItem];
    try {
      swimmingEvent = new SwimmingEvent({
        date,
        teams,
        notes,
        event,
        results,
      });
      swimmingEvent.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  }
  res.send("Schedule saved");
});

// @route   GET api/swimmingEvents
// @desc    Get a swimming event
// @acess   Public
router.get("/", async (req, res) => {
  try {
    const schedule = await SwimmingEvent.find().sort({ date: "asc" });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/swimmingEvents
// @desc    Update Acadia swiming events
// @acess   Public
// Not currently in use.
router.put("/", (req, res) => {
  res.send("Update Acadia swimming event");
});

// @route   DELETE api/swimmingEvents
// @desc    Delete Acadia swimming event
// @acess   Public
router.delete("/", async (req, res) => {
  try {
    await SwimmingEvent.deleteMany({});
    res.send("Schedule deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

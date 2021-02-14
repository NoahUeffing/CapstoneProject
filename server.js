// Sets up express server on either port given by enviornment varibale or port 5000.
const express = require("express");

const app = express();

// Sends data to the "/" endpoint on the server
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the Acadia Athletics programs API..." })
);

// Define Routes
app.use("/api/footballRoster", require("./routes/footballRoster"));
app.use("/api/footballSchedule", require("./routes/footballSchedule"));
app.use("/api/footballTeamStats", require("./routes/footballTeamStats"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

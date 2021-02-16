// Sets up express server on either port given by enviornment varibale or port 5000.
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

// Sends data to the "/" endpoint on the server
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the Acadia Athletics programs API..." })
);

// Define Routes
app.use("/api/mfootballRoster", require("./routes/mfootballRoster"));
app.use("/api/mfootballSchedule", require("./routes/mfootballSchedule"));
app.use("/api/mfootballTeamStats", require("./routes/mfootballTeamStats"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

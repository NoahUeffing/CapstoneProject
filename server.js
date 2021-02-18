// Sets up express server on either port given by enviornment varibale or port 5000.
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Sends data to the "/" endpoint on the server
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the Acadia Athletics programs API..." })
);

// Define Routes

// Basketball
app.use("/api/mbasketControlStats", require("./routes/mbasketControlStats"));
app.use("/api/mbasketPlayers", require("./routes/mbasketPlayers"));
app.use("/api/mbasketGames", require("./routes/mbasketGames"));
app.use("/api/mbasketShootingStats", require("./routes/mbasketShootingStats"));
app.use("/api/mbasketTeams", require("./routes/mbasketTeams"));

// Football
app.use("/api/mfootballPlayers", require("./routes/mfootballPlayers"));
app.use("/api/mfootballGames", require("./routes/mfootballGames"));
app.use("/api/mfootballTeams", require("./routes/mfootballTeams"));

// Hockey
app.use("/api/mhockeyPlayerStats", require("./routes/mhockeyPlayerStats"));
app.use("/api/mhockeyPlayers", require("./routes/mhockeyPlayers"));
app.use("/api/mhockeyGames", require("./routes/mhockeyGames"));
app.use("/api/mhockeyGoalieStats", require("./routes/mhockeyGoalieStats"));
app.use("/api/mhockeyTeams", require("./routes/mhockeyTeams"));

// Soccer
app.use("/api/msoccerPlayers", require("./routes/msoccerPlayers"));
app.use("/api/msoccerGames", require("./routes/msoccerGames"));
app.use("/api/msoccerTeams", require("./routes/msoccerTeams"));

// Swimming
app.use("/api/swimmers", require("./routes/swimmers"));
app.use("/api/swimmingEvents", require("./routes/swimmingEvents"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

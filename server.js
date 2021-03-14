// Sets up express server on either port given by enviornment variable or port 5000.
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
app.use("/api/wbasketTeams", require("./routes/wbasketTeams"));
app.use("/api/wbasketGames", require("./routes/wbasketGames"));
app.use("/api/wbasketPlayers", require("./routes/wbasketPlayers"));

// Cross Country
app.use("/api/wrunners", require("./routes/wrunners"));
app.use("/api/wrunningEvents", require("./routes/wrunningEvents"));

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

// Rugby
app.use("/api/wrugbyPlayers", require("./routes/wrugbyPlayers"));
app.use("/api/wrugbyGames", require("./routes/wrugbyGames"));
app.use("/api/wrugbyTeams", require("./routes/wrugbyTeams"));

// Soccer
app.use("/api/msoccerPlayers", require("./routes/msoccerPlayers"));
app.use("/api/msoccerGames", require("./routes/msoccerGames"));
app.use("/api/msoccerTeams", require("./routes/msoccerTeams"));
app.use("/api/wsoccerPlayers", require("./routes/wsoccerPlayers"));
app.use("/api/wsoccerGames", require("./routes/wsoccerGames"));
app.use("/api/wsoccerTeams", require("./routes/wsoccerTeams"));

// Swimming
app.use("/api/swimmers", require("./routes/swimmers"));
app.use("/api/swimmingEvents", require("./routes/swimmingEvents"));

// Volleyball
app.use("/api/wvolleyPlayers", require("./routes/wvolleyPlayers"));
app.use("/api/wvolleyGames", require("./routes/wvolleyGames"));
app.use("/api/wvolleyTeams", require("./routes/wvolleyTeams"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

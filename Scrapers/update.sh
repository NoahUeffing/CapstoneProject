#!/usr/bin/env bash

# This script runs all web scrapers to update the json found in the 'data' directory,
# then runs update.py to update the database with this new data.

echo "Running mbasketControlStats.js"
node mbasketControlStats.js
echo "Running mbasketRoster.js"
node mbasketRoster.js
echo "Running mbasketSchedule.js"
node mbasketSchedule.js
echo "Running mbasketShootingStats.js"
node mbasketShootingStats.js
echo "Running mbasketTeamStats.js"
node mbasketTeamStats.js
echo "Running mfootRoster.js"
node mfootRoster.js
echo "Running mfootSchedule.js"
node mfootSchedule.js
echo "Running mfootTeamStats.js"
node mfootTeamStats.js
echo "Running mhockeyGoalieStats.js"
node mhockeyGoalieStats.js
echo "Running mhockeyPlayerStats.js"
node mhockeyPlayerStats.js
echo "Running mhockeyRoster.js"
node mhockeyRoster.js
echo "Running mhockeySchedule.js"
node mhockeySchedule.js
echo "Running mhockeyTeamStats.js"
node mhockeyTeamStats.js
echo "Running msoccerRoster.js"
node msoccerRoster.js
echo "Running msoccerSchedule.js"
node msoccerSchedule.js
echo "Running msoccerTeamStats.js"
node msoccerTeamStats.js
echo "Running swimRoster.js"
node swimRoster.js
echo "Running swimSchedule.js"
node swimSchedule.js
echo "Running wbasketRoster.js"
node wbasketRoster.js
echo "Running wbasketSchedule.js"
node wbasketSchedule.js
echo "Running wbasketTeamStats.js"
node wbasketTeamStats.js
echo "Running wcrossRoster.js"
node wcrossRoster.js
echo "Running wcrossSchedule.js"
node wcrossSchedule.js
echo "Running wrugbyRoster.js"
node wrugbyRoster.js
echo "Running wrugbySchedule.js"
node wrugbySchedule.js
echo "Running wrugbyTeamStats.js"
node wrugbyTeamStats.js
echo "Running wsoccerRoster.js"
node wsoccerRoster.js
echo "Running wsoccerSchedule.js"
node wsoccerSchedule.js
echo "Running wsoccerTeamStats.js"
node wsoccerTeamStats.js
echo "Running wvolleyRoster.js"
node wvolleyRoster.js
echo "Running wvolleySchedule.js"
node wvolleySchedule.js
echo "Running wvolleyTeamStats.js"
node wvolleyTeamStats.js
echo "Updating Database"
python update.py
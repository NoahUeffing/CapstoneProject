import requests
import time


def deleteFromDB(db):
    count = 0
    while count < 3:
        try:
            r = requests.delete('http://localhost:5000/api/' + db, timeout=5)
            break
        except:
            count = count+1
            print("Connection Refused")
            print("Trying again")
            time.sleep(2)
            continue
    print('Result for DELETE request to ' + db + ': ' + r.text)


def postToDB(fp, db):
    count = 0
    contents = open('../data/' + fp, 'rb').read()
    headers = {'content-type': 'application/json'}
    while count < 3:
        try:
            r = requests.post('http://localhost:5000/api/' + db,
                              data=contents, headers=headers, timeout=5)
            break
        except:
            count = count+1
            print("Connection Refused")
            print("Trying again")
            time.sleep(2)
            continue

    print("Result for " + fp + " POST request: " + r.text)


deleteFromDB("mbasketControlStats")
postToDB("mbasketControlStats.json", "mbasketControlStats")
print()
deleteFromDB("mbasketPlayers")
postToDB("mbasketRoster.json", "mbasketPlayers")
print()
deleteFromDB("mbasketGames")
postToDB("mbasketSchedule.json", "mbasketGames")
print()
deleteFromDB("mbasketShootingStats")
postToDB("mbasketShootingStats.json", "mbasketShootingStats")
print()
deleteFromDB("mbasketTeams")
postToDB("mbasketTeamStats.json", "mbasketTeams")
print()
deleteFromDB("mfootballPlayers")
postToDB("mfootRoster.json", "mfootballPlayers")
print()
deleteFromDB("mfootballGames")
postToDB("mfootSchedule.json", "mfootballGames")
print()
deleteFromDB("mfootballTeams")
postToDB("mfootTeamStats.json", "mfootballTeams")
print()
deleteFromDB("mhockeyGoalieStats")
postToDB("mhockeyGoalieStats.json", "mhockeyGoalieStats")
print()
deleteFromDB("mhockeyPlayerStats")
postToDB("mhockeyPlayerStats.json", "mhockeyPlayerStats")
print()
deleteFromDB("mhockeyPlayers")
postToDB("mhockeyRoster.json", "mhockeyPlayers")
print()
deleteFromDB("mhockeyGames")
postToDB("mhockeySchedule.json", "mhockeyGames")
print()
deleteFromDB("mhockeyTeams")
postToDB("mhockeyTeamStats.json", "mhockeyTeams")
print()
deleteFromDB("msoccerPlayers")
postToDB("msoccerRoster.json", "msoccerPlayers")
print()
deleteFromDB("msoccerGames")
postToDB("msoccerSchedule.json", "msoccerGames")
print()
deleteFromDB("msoccerTeams")
postToDB("msoccerTeamStats.json", "msoccerTeams")
print()
deleteFromDB("swimmers")
postToDB("swimRoster.json", "swimmers")
print()
deleteFromDB("swimmingEvents")
postToDB("swimSchedule.json", "swimmingEvents")
print()
deleteFromDB("wbasketGames")
postToDB("wbasketSchedule.json", "wbasketGames")
print()
deleteFromDB("wbasketPlayers")
postToDB("wbasketRoster.json", "wbasketPlayers")
print()
deleteFromDB("wbasketTeams")
postToDB("wbasketTeamStats.json", "wbasketTeams")
print()
deleteFromDB("wrunners")
postToDB("wcrossRoster.json", "wrunners")
print()
deleteFromDB("wrunningEvents")
postToDB("wcrossSchedule.json", "wrunningEvents")
print()
deleteFromDB("wrugbyPlayers")
postToDB("wrugbyRoster.json", "wrugbyPlayers")
print()
deleteFromDB("wrugbyGames")
postToDB("wrugbySchedule.json", "wrugbyGames")
print()
deleteFromDB("wrugbyTeams")
postToDB("wrugbyTeamStats.json", "wrugbyTeams")
print()
deleteFromDB("wsoccerPlayers")
postToDB("wsoccerRoster.json", "wsoccerPlayers")
print()
deleteFromDB("wsoccerGames")
postToDB("wsoccerSchedule.json", "wsoccerGames")
print()
deleteFromDB("wsoccerTeams")
postToDB("wsoccerTeamStats.json", "wsoccerTeams")
print()
deleteFromDB("wvolleyPlayers")
postToDB("wvolleyRoster.json", "wvolleyPlayers")
print()
deleteFromDB("wvolleyGames")
postToDB("wvolleySchedule.json", "wvolleyGames")
print()
deleteFromDB("wvolleyTeams")
postToDB("wvolleyTeamStats.json", "wvolleyTeams")
print()

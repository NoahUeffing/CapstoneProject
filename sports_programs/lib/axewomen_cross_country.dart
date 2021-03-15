import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;
import 'dart:async';
import 'dart:convert';
import 'package:intl/intl.dart';
import 'dart:io' show Platform;

// This file creates the Axewomen Cross Country page with tabs for
// schedule and Acadia roster

// Get roster information from the api
Future<Roster> fetchRoster() async {
  var api = '';
  if (Platform.isAndroid) {
    api = globals.androidApi;
  } else {
    api = globals.iosApi;
  }
  final response = await http.get(api + '/wrunners');

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Roster.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load roster');
  }
}

// Get schedule inforamtion from the api
Future<Schedule> fetchSchedule() async {
  var api = '';
  if (Platform.isAndroid) {
    api = globals.androidApi;
  } else {
    api = globals.iosApi;
  }
  final response = await http.get(api + '/wrunningEvents');
  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Schedule.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load schedule');
  }
}

// Create a list of Acadia cross country runners
class Roster {
  final List<Player> players;
  Roster({this.players});
  factory Roster.fromJson(List<dynamic> parsedJson) {
    List<Player> players = [];
    players = parsedJson.map((i) => Player.fromJson(i)).toList();
    return new Roster(players: players);
  }
}

// Create a list of Acadia cross country events
class Schedule {
  final List<Game> games;
  Schedule({this.games});
  factory Schedule.fromJson(List<dynamic> parsedJson) {
    List<Game> games = [];
    games = parsedJson.map((i) => Game.fromJson(i)).toList();
    return new Schedule(games: games);
  }
}

// Create a runner for each runner entry in the api
class Player {
  final String id;
  final String name;
  final String yr;
  final String town;

  Player({this.id, this.name, this.yr, this.town});

  factory Player.fromJson(Map<String, dynamic> json) {
    return new Player(
      id: json['_id'].toString(),
      name: json['name'].toString(),
      yr: json['yr'].toString(),
      town: json['town'].toString(),
    );
  }
}

// Create an event for each event entry in the api
class Game {
  final String id;
  final String date;
  final String event;
  final String result;
  Game({this.id, this.date, this.event, this.result});

  factory Game.fromJson(Map<String, dynamic> json) {
    String formattedDate =
        DateFormat("MMMEd").format(DateTime.parse(json['date']));
    return new Game(
      id: json['_id'].toString(),
      date: formattedDate,
      event: json['event'].toString(),
      result: json['result'].toString(),
    );
  }
}

class AxewomenCrossCountry extends StatefulWidget {
  @override
  AxewomenCrossCountryState createState() => AxewomenCrossCountryState();
}

class AxewomenCrossCountryState extends State<AxewomenCrossCountry> {
  // Create placeholders for data from the api
  Future<Roster> futureRoster;
  Future<Schedule> futureSchedule;

  @override
  // Fetch required information
  void initState() {
    super.initState();
    futureRoster = fetchRoster();
    futureSchedule = fetchSchedule();
  }

  // Create the information to populate tabs
  Widget _buildList() {
    return TabBarView(
      children: [
        // First tab, displays the schedule
        FutureBuilder<Schedule>(
          future: futureSchedule,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              List<Game> yourGames = snapshot.data.games;
              return ListView.separated(
                padding: const EdgeInsets.all(20),
                itemCount: yourGames.length,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                      height: 65,
                      child: Text(
                          yourGames[index].date +
                              '\n' +
                              yourGames[index].event +
                              '\n' +
                              yourGames[index].result,
                          style: TextStyle(
                            fontSize: 18,
                          )));
                },
                separatorBuilder: (BuildContext context, int index) =>
                    const Divider(),
              );
            } else if (snapshot.hasError) {
              return Text("${snapshot.error}");
            }

            // By default, show a loading spinner.
            return CircularProgressIndicator();
          },
        ),
        // Second tab, displays the Acadia roster
        FutureBuilder<Roster>(
          future: futureRoster,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              List<Player> yourPlayers = snapshot.data.players;
              return ListView.separated(
                padding: const EdgeInsets.all(20),
                itemCount: yourPlayers.length,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                      height: 65,
                      child: Text(
                          yourPlayers[index].name +
                              ' - ' +
                              yourPlayers[index].yr +
                              ' year\nHometown: ' +
                              yourPlayers[index].town,
                          style: TextStyle(
                            fontSize: 18,
                          )));
                },
                separatorBuilder: (BuildContext context, int index) =>
                    const Divider(),
              );
            } else if (snapshot.hasError) {
              return Text("${snapshot.error}");
            }

            // By default, show a loading spinner.
            return CircularProgressIndicator();
          },
        ),
      ],
    );
  }

  // Builds the page with appbar as defined below and body given by _buildList
  // Tab order matters. The tab titles given below are associated with the
  // children in the given order of the above function. Ex. FutureBuilder<Schedule>
  // is associated with the tab with the calendar icon given below.
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
          appBar: AppBar(
            bottom: TabBar(
              tabs: [
                Tab(icon: Icon(Icons.calendar_today)),
                Tab(text: "Acadia Roster"),
              ],
            ),
            title: RichText(
              text: TextSpan(
                children: [
                  WidgetSpan(
                    child: Icon(Icons.directions_run,
                        size: 22, color: Colors.white),
                  ),
                  TextSpan(
                    text: " Axewomen Cross Country",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        fontSize: 22),
                  ),
                ],
              ),
            ),
          ),
          body: _buildList()),
    );
  }
}

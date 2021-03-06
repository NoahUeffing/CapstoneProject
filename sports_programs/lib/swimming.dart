import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;
import 'dart:async';
import 'dart:convert';
import 'package:intl/intl.dart';
import 'dart:io' show Platform;
import 'package:webview_flutter/webview_flutter.dart';

// This file creates the Swimming page with tabs for
// schedule and Acadia roster

// Get roster information from the api
Future<Roster> fetchRoster() async {
  var api = '';
  if (Platform.isAndroid) {
    api = globals.androidApi;
  } else {
    api = globals.iosApi;
  }
  final response = await http.get(api + '/swimmers');

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
  final response = await http.get(api + '/swimmingEvents');
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

// Create a list of Acadia swimmers
class Roster {
  final List<Player> players;
  Roster({this.players});
  factory Roster.fromJson(List<dynamic> parsedJson) {
    List<Player> players = [];
    players = parsedJson.map((i) => Player.fromJson(i)).toList();
    return new Roster(players: players);
  }
}

// Create a list of Acadia swimming events
class Schedule {
  final List<Game> games;
  Schedule({this.games});
  factory Schedule.fromJson(List<dynamic> parsedJson) {
    List<Game> games = [];
    games = parsedJson.map((i) => Game.fromJson(i)).toList();
    return new Schedule(games: games);
  }
}

// Create a swimmer for each swimmer entry in the api
class Player {
  final String id;
  final String name;
  final String yr;
  final String club;
  final String town;

  Player({this.id, this.name, this.yr, this.club, this.town});

  factory Player.fromJson(Map<String, dynamic> json) {
    return new Player(
      id: json['_id'].toString(),
      name: json['name'].toString(),
      yr: json['yr'].toString(),
      club: json['club'].toString(),
      town: json['town'].toString(),
    );
  }
}

// Create an event for each game entry in the api
class Game {
  final String id;
  final String date;
  final String notes;
  final String teams;
  final String event;
  final String results;
  Game({this.id, this.date, this.notes, this.teams, this.event, this.results});

  factory Game.fromJson(Map<String, dynamic> json) {
    String formattedDate =
        DateFormat(globals.dateFormat).format(DateTime.parse(json['date']));
    return new Game(
      id: json['_id'].toString(),
      date: formattedDate,
      notes: json['notes'].toString(),
      teams: json['teams'].toString(),
      event: json['event'].toString(),
      results: json['results'].toString(),
    );
  }
}

class Swimming extends StatefulWidget {
  @override
  SwimmingState createState() => SwimmingState();
}

class SwimmingState extends State<Swimming> {
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

  // urls for opponent rosters
  final urlList = [
    'https://daltigers.ca/sports/swim/2020-21/roster',
    'https://www.goseahawks.ca/sports/mswim/2019-20/roster',
    'https://www.goseahawks.ca/sports/wswim/2019-20/roster',
    'https://mountiepride.ca/sports/swim/2020-21/roster',
    'https://goredsgo.ca/sports/mswim/2020-21/roster',
    'https://goredsgo.ca/sports/wswim/2020-21/roster',
  ];

  // colours for opponent roster buttons
  final colorsList = [
    globals.dalBlack,
    globals.munPink,
    globals.munPink,
    globals.mtaGold,
    globals.unbRed,
    globals.unbRed,
  ];

  // icons for opponent roster buttons
  final iconsList = [
    globals.dalIcon,
    globals.munIcon,
    globals.munIcon,
    globals.mtaIcon,
    globals.unbIcon,
    globals.unbIcon,
  ];

  // titles for opponent roster buttons
  final teamsList = [
    globals.dalName,
    globals.munName + " Men's",
    globals.munName + " Women's",
    globals.mtaName,
    globals.unbName + " Men's",
    globals.unbName + " Women's",
  ];

  // Create the list of opponent roster buttons by iterating over
  // through urlList, colorsList, iconsList, and teamsList.
  Widget _buildOpponents() {
    return ListView.separated(
      padding: const EdgeInsets.all(globals.defaultPadding),
      itemCount: urlList.length,
      itemBuilder: (BuildContext context, int index) {
        return Container(
          height: 65,
          color: colorsList[index],
          child: Center(
              child: TextButton.icon(
                  icon: Icon(iconsList[index],
                      size: globals.titleSize, color: globals.titleColor),
                  label: Text(' ' + teamsList[index], style: globals.titleFont),
                  // On button push, open a page with a webview of the opponent roster url
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => Scaffold(
                              appBar: AppBar(
                                title: RichText(
                                  text: TextSpan(
                                    children: [
                                      WidgetSpan(
                                        child: Icon(iconsList[index],
                                            size: globals.titleSize,
                                            color: globals.titleColor),
                                      ),
                                      TextSpan(
                                        text:
                                            "  " + teamsList[index] + " Roster",
                                        style: globals.titleFont,
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                              body: WebView(
                                initialUrl: urlList[index],
                                javascriptMode: JavascriptMode.unrestricted,
                              )),
                        ));
                  })),
        );
      },
      separatorBuilder: (BuildContext context, int index) => const Divider(),
    );
  }

  // Create the information to populate tabs
  Widget _buildList() {
    return Theme(
        data: Theme.of(context).copyWith(dividerColor: globals.acadiaRed),
        child: TabBarView(
          children: [
            // First tab, displays the schedule
            FutureBuilder<Schedule>(
              future: futureSchedule,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  List<Game> yourGames = snapshot.data.games;
                  return ListView.separated(
                    padding: const EdgeInsets.all(globals.defaultPadding),
                    itemCount: yourGames.length,
                    itemBuilder: (BuildContext context, int index) {
                      return Container(
                          child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                            Expanded(
                                child: Text(
                                    yourGames[index].date +
                                        '\nTeams(s): ' +
                                        yourGames[index].teams +
                                        '\n' +
                                        yourGames[index].notes +
                                        '\nResults: ' +
                                        yourGames[index].results,
                                    style: globals.defaultFont))
                          ]));
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
            // This commented code retieves the data from the api
            // Currently a webview is used instead for simplicity and aesthetics
            // Can be swapped out by uncommenting the follwoing code and commenting out
            // the below webview
            /*FutureBuilder<Roster>(
          future: futureRoster,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              List<Player> yourPlayers = snapshot.data.players;
              return ListView.separated(
                padding: const EdgeInsets.all(globals.defaultPadding),
                itemCount: yourPlayers.length,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                      height: 85,
                      child: Text(
                          yourPlayers[index].name +
                              ' - ' +
                              yourPlayers[index].yr +
                              ' year\nFormer Club: ' +
                              yourPlayers[index].club +
                              '\nHometown: ' +
                              yourPlayers[index].town,
                          style: TextStyle(
                            fontSize: globals.defaultFont,
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
        ),*/
            // Webview verison of Acadia Roster
            WebView(
              initialUrl:
                  'https://www.acadiaathletics.ca/sports/swim/2020-21/roster',
              javascriptMode: JavascriptMode.unrestricted,
            ),
            // Third tab, displays a list of buttons with links to opponent rosters
            _buildOpponents(),
          ],
        ));
  }

  // Builds the page with appbar as defined below and body given by _buildList
  // Tab order matters. The tab titles given below are associated with the
  // children in the given order of the above function. Ex. FutureBuilder<Schedule>
  // is associated with the tab with the calendar icon given below.
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
          appBar: AppBar(
            bottom: TabBar(
              tabs: [
                Tab(icon: Icon(globals.scheduleIcon)),
                Tab(text: globals.longRosterTitle),
                Tab(text: globals.awayRosterTitle),
              ],
            ),
            title: RichText(
              text: TextSpan(
                children: [
                  WidgetSpan(
                    child: Icon(globals.swimmingIcon,
                        size: globals.titleSize, color: globals.titleColor),
                  ),
                  TextSpan(
                    text: " " + globals.swimmingTitle,
                    style: globals.titleFont,
                  ),
                ],
              ),
            ),
          ),
          body: _buildList()),
    );
  }
}

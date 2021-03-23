import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;
import 'dart:async';
import 'dart:convert';
import 'package:intl/intl.dart';
import 'dart:io' show Platform;
import 'package:webview_flutter/webview_flutter.dart';

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
        DateFormat(globals.dateFormat).format(DateTime.parse(json['date']));
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

// urls for opponent rosters
  final urlList = [
    'https://daltigers.ca/sports/xc/2020-21/wroster',
    'https://www.goseahawks.ca/sports/wxc/2019-20/roster',
    'https://www.umoncton.ca/umcm-sports/node/183',
    'https://goredsgo.ca/sports/wxc/2020-21/roster',
    'https://www.gopanthersgo.ca/sports/xc/2020-21/wroster',
    'https://www.smuhuskies.ca/sports/xc/2020-21/wroster',
    'https://www.gotommies.ca/sports/wxc/2020-21/roster',
    'https://www.goxgo.ca/sports/xc/2020-21/wroster',
  ];

  // colours for opponent roster buttons
  final colorsList = [
    globals.dalBlack,
    globals.munPink,
    globals.monctonBlue,
    globals.unbRed,
    globals.upeiGreen,
    globals.smuPink,
    globals.stuGreen,
    globals.stfxBlue,
  ];

  // icons for opponent roster buttons
  final iconsList = [
    globals.dalIcon,
    globals.munIcon,
    globals.monctonIcon,
    globals.unbIcon,
    globals.upeiIcon,
    globals.smuIcon,
    globals.stuIcon,
    globals.stfxIcon,
  ];

  // titles for opponent roster buttons
  final teamsList = [
    globals.dalName,
    globals.munName,
    globals.monctonName,
    globals.unbName,
    globals.upeiName,
    globals.smuName,
    globals.stuName,
    globals.stfxName
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
                            Text(
                              yourGames[index].date,
                              style: globals.defaultFont,
                            ),
                            Text(
                              yourGames[index].event +
                                  ' \n' +
                                  yourGames[index].result,
                              style: globals.defaultFont,
                            )
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
                            globals.defaultFont,
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
                  'https://www.acadiaathletics.ca/sports/wxc/2019-20/roster',
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
                    child: Icon(globals.crossCountryIcon,
                        size: globals.titleSize, color: globals.titleColor),
                  ),
                  TextSpan(
                    text: " " + globals.womenCrossCountryTitle,
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

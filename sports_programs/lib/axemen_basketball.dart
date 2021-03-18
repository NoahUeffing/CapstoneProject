import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;
import 'dart:async';
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'dart:io' show Platform;

// This file creates the Axemen Basketball page with tabs for
// schedule, Acadia roster, opponents roster, and AUS standings

// Get roster information from the api
Future<Roster> fetchRoster() async {
  var api = '';
  if (Platform.isAndroid) {
    api = globals.androidApi;
  } else {
    api = globals.iosApi;
  }

  final response = await http.get(api + '/mbasketPlayers');

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
  final response = await http.get(api + '/mbasketGames');
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

// Get standings information from the api
Future<Standings> fetchStandings() async {
  var api = '';
  if (Platform.isAndroid) {
    api = globals.androidApi;
  } else {
    api = globals.iosApi;
  }
  final response = await http.get(api + '/mbasketTeams');
  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Standings.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load schedule');
  }
}

// Create a list of Acadia basketball players
class Roster {
  final List<Player> players;
  Roster({this.players});
  factory Roster.fromJson(List<dynamic> parsedJson) {
    List<Player> players = [];
    players = parsedJson.map((i) => Player.fromJson(i)).toList();
    return new Roster(players: players);
  }
}

// Create a list of Acadia basketball games
class Schedule {
  final List<Game> games;
  Schedule({this.games});
  factory Schedule.fromJson(List<dynamic> parsedJson) {
    List<Game> games = [];
    games = parsedJson.map((i) => Game.fromJson(i)).toList();
    return new Schedule(games: games);
  }
}

// Create a list of AUS basketball teams with stats
class Standings {
  final List<Team> teams;
  Standings({this.teams});
  factory Standings.fromJson(List<dynamic> parsedJson) {
    List<Team> teams = [];
    teams = parsedJson.map((i) => Team.fromJson(i)).toList();
    return new Standings(teams: teams);
  }
}

// Create a player for each player entry in the api
class Player {
  final String id;
  final String no;
  final String name;
  final String pos;
  final String yr;
  final String ht;
  final String town;

  Player({this.id, this.no, this.name, this.pos, this.yr, this.ht, this.town});

  factory Player.fromJson(Map<String, dynamic> json) {
    return new Player(
      id: json['_id'].toString(),
      no: json['no'].toString(),
      name: json['name'].toString(),
      pos: json['pos'].toString(),
      yr: json['yr'].toString(),
      ht: json['ht'].toString(),
      town: json['town'].toString(),
    );
  }
}

// Create a game for each game entry in the api
class Game {
  final String id;
  final String date;
  final String homeAway;
  final String opponent;
  final String status;
  final String score;
  Game(
      {this.id,
      this.date,
      this.homeAway,
      this.opponent,
      this.status,
      this.score});

  factory Game.fromJson(Map<String, dynamic> json) {
    String formattedDate =
        DateFormat(globals.dateFormat).format(DateTime.parse(json['date']));
    return new Game(
      id: json['_id'].toString(),
      date: formattedDate,
      homeAway: json['homeAway'].toString(),
      opponent: json['opponent'].toString(),
      status: json['status'].toString(),
      score: json['score'].toString(),
    );
  }
}

// Create a team for each team entry in the api
class Team {
  final String id;
  final String team;
  final String gp;
  final String winLoss;
  final String pct;
  final String gf;
  final String ga;
  final String l10;
  final String streak;
  final String pts;
  Team(
      {this.id,
      this.team,
      this.gp,
      this.winLoss,
      this.pct,
      this.gf,
      this.ga,
      this.l10,
      this.streak,
      this.pts});

  factory Team.fromJson(Map<String, dynamic> json) {
    return new Team(
      id: json['_id'].toString(),
      team: json['team'].toString(),
      gp: json['gp'].toString(),
      winLoss: json['winLoss'].toString(),
      pct: json['pct'].toString(),
      gf: json['gf'].toString(),
      ga: json['ga'].toString(),
      l10: json['l10'].toString(),
      streak: json['streak'].toString(),
      pts: json['pts'].toString(),
    );
  }
}

class AxemenBasketball extends StatefulWidget {
  @override
  AxemenBasketballState createState() => AxemenBasketballState();
}

class AxemenBasketballState extends State<AxemenBasketball> {
  // Create placeholders for data from the api
  Future<Roster> futureRoster;
  Future<Schedule> futureSchedule;
  Future<Standings> futureStandings;

  @override
  // Fetch required information
  void initState() {
    super.initState();
    futureRoster = fetchRoster();
    futureSchedule = fetchSchedule();
    futureStandings = fetchStandings();
  }

  // urls for opponent rosters
  final urlList = [
    'https://www.gocapersgo.ca/sports/mbkb/2020-21/roster',
    'https://daltigers.ca/sports/mbkb/2020-21/roster',
    'https://www.goseahawks.ca/sports/mbkb/2019-20/roster',
    'https://goredsgo.ca/sports/mbkb/2019-20/roster',
    'https://www.gopanthersgo.ca/sports/mbkb/2020-21/roster',
    'https://www.smuhuskies.ca/sports/mbkb/2020-21/roster',
    'https://www.goxgo.ca/sports/mbkb/2020-21/roster',
  ];

  // colours for opponent roster buttons
  final colorsList = [
    globals.cbuOrange,
    globals.dalBlack,
    globals.munPink,
    globals.unbRed,
    globals.upeiGreen,
    globals.smuPink,
    globals.stfxBlue,
  ];

  // icons for opponent roster buttons
  final iconsList = [
    globals.cbuIcon,
    globals.dalIcon,
    globals.munIcon,
    globals.unbIcon,
    globals.upeiIcon,
    globals.smuIcon,
    globals.stfxIcon,
  ];

  // titles for opponent roster buttons
  final teamsList = [
    globals.cbuName,
    globals.dalName,
    globals.munName,
    globals.unbName,
    globals.upeiName,
    globals.smuName,
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
        child: TabBarView(children: [
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
                          Text(
                            yourGames[index].date,
                            style: globals.defaultFont,
                          ),
                          Text(
                            yourGames[index].homeAway +
                                ' ' +
                                yourGames[index].opponent,
                            style: globals.defaultFont,
                          ),
                          Text(
                            yourGames[index].status +
                                ' \n' +
                                yourGames[index].score,
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
                      height: 125,
                      child: Text(
                          '#' +
                              yourPlayers[index].no +
                              ' ' +
                              yourPlayers[index].name +
                              '\nHeight: ' +
                              yourPlayers[index].ht +
                              '\nYear: ' +
                              yourPlayers[index].yr +
                              '\nPosition: ' +
                              yourPlayers[index].pos +
                              '\nHometown: ' +
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
        ),*/
          // Webview verison of Acadia Roster
          WebView(
            initialUrl:
                'https://www.acadiaathletics.ca/sports/mbkb/2020-21/roster',
            javascriptMode: JavascriptMode.unrestricted,
          ),
          // Third tab, displays a list of buttons with links to opponent rosters
          _buildOpponents(),
          // Fourth tab, displays the AUS standings
          FutureBuilder<Standings>(
            future: futureStandings,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                List<Team> yourTeams = snapshot.data.teams;
                final rows = <DataRow>[];
                for (var i = 0; i < yourTeams.length; i++) {
                  rows.add(DataRow(
                      color: MaterialStateProperty.resolveWith<Color>(
                          (Set<MaterialState> states) {
                        return globals.tableRowColor; // Use the default value.
                      }),
                      cells: [
                        DataCell(Text(
                          yourTeams[i].team,
                          style: globals.defaultFont,
                        )),
                        DataCell(Text(
                          yourTeams[i].gp,
                          style: globals.defaultFont,
                        )),
                        DataCell(Text(
                          yourTeams[i].winLoss,
                          style: globals.defaultFont,
                        )),
                        DataCell(Text(
                          yourTeams[i].pct,
                          style: globals.defaultFont,
                        )),
                        DataCell(Text(
                          yourTeams[i].gf,
                          style: globals.defaultFont,
                        )),
                        DataCell(Text(
                          yourTeams[i].ga,
                          style: globals.defaultFont,
                        )),
                        DataCell(Text(
                          yourTeams[i].l10,
                          style: globals.defaultFont,
                        )),
                        DataCell(Text(
                          yourTeams[i].streak,
                          style: globals.defaultFont,
                        )),
                        DataCell(Text(
                          yourTeams[i].pts,
                          style: globals.defaultFont,
                        )),
                      ]));
                }
                return /*Padding(
                    padding: const EdgeInsets.all(globals.defaultPadding),
                    child: */
                    SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: DataTable(
                                headingRowColor: MaterialStateColor.resolveWith(
                                    (states) => globals.acadiaRed),
                                columns: [
                                  DataColumn(
                                      label: Text('Team',
                                          style: globals.tableFontStyle)),
                                  DataColumn(
                                      label: Text(
                                    'GP',
                                    style: globals.tableFontStyle,
                                  )),
                                  DataColumn(
                                      label: Text(
                                    'W-L',
                                    style: globals.tableFontStyle,
                                  )),
                                  DataColumn(
                                      label: Text(
                                    'PCT',
                                    style: globals.tableFontStyle,
                                  )),
                                  DataColumn(
                                      label: Text(
                                    'PF',
                                    style: globals.tableFontStyle,
                                  )),
                                  DataColumn(
                                      label: Text(
                                    'PA',
                                    style: globals.tableFontStyle,
                                  )),
                                  DataColumn(
                                      label: Text(
                                    'Last 10',
                                    style: globals.tableFontStyle,
                                  )),
                                  DataColumn(
                                      label: Text(
                                    'Streak',
                                    style: globals.tableFontStyle,
                                  )),
                                  DataColumn(
                                      label: Text(
                                    'PTS',
                                    style: globals.tableFontStyle,
                                  )),
                                ],
                                rows: rows)));
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              // By default, show a loading spinner.
              return CircularProgressIndicator();
            },
          ),
        ]));
  }

  // Builds the page with appbar as defined below and body given by _buildList
  // Tab order matters. The tab titles given below are associated with the
  // children in the given order of the above function. Ex. FutureBuilder<Schedule>
  // is associated with the tab with the calendar icon given below.
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
          appBar: AppBar(
            bottom: TabBar(
              tabs: [
                Tab(icon: Icon(globals.scheduleIcon)),
                Tab(text: globals.shortRosterTitle),
                Tab(text: globals.awayRosterTitle),
                Tab(icon: Icon(globals.standingsIcon)),
              ],
            ),
            title: RichText(
              text: TextSpan(
                children: [
                  WidgetSpan(
                    child: Icon(globals.basketballIcon,
                        size: globals.titleSize, color: globals.titleColor),
                  ),
                  TextSpan(
                      text: " " + globals.menBasketBallTitle,
                      style: globals.titleFont),
                ],
              ),
            ),
          ),
          body: _buildList()),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;
import 'dart:async';
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'dart:io' show Platform;
import './presentation/my_flutter_app_icons.dart';

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
        DateFormat("MMMEd").format(DateTime.parse(json['date']));
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
    MyFlutterApp.cbu,
    MyFlutterApp.dal,
    MyFlutterApp.mun,
    MyFlutterApp.unb,
    MyFlutterApp.upei,
    MyFlutterApp.smu,
    MyFlutterApp.stfx,
  ];

  // titles for opponent roster buttons
  final teamsList = [
    'Cape Breton',
    'Dalhousie',
    'Memorial',
    'UNB',
    'UPEI',
    "Saint Mary's",
    'STFX'
  ];

  // Create the list of opponent roster buttons by iterating over
  // through urlList, colorsList, iconsList, and teamsList.
  Widget _buildOpponents() {
    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: urlList.length,
      itemBuilder: (BuildContext context, int index) {
        return Container(
          height: 65,
          color: colorsList[index],
          child: Center(
              child: TextButton.icon(
                  icon: Icon(iconsList[index], size: 22, color: Colors.white),
                  label: Text(' ' + teamsList[index],
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          fontSize: 18)),
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
                                            size: 22, color: Colors.white),
                                      ),
                                      TextSpan(
                                        text:
                                            "  " + teamsList[index] + " Roster",
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                            fontSize: 22),
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
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                        Text(
                          yourGames[index].date,
                          style: TextStyle(fontSize: 18),
                        ),
                        Text(
                          yourGames[index].homeAway +
                              ' ' +
                              yourGames[index].opponent,
                          style: TextStyle(fontSize: 18),
                        ),
                        Text(
                          yourGames[index].status +
                              ' \n' +
                              yourGames[index].score,
                          style: TextStyle(fontSize: 18),
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
              return ListView.separated(
                padding: const EdgeInsets.all(20),
                itemCount: yourTeams.length,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                        Text(yourTeams[index].team,
                            style: TextStyle(
                                fontSize: 25, fontWeight: FontWeight.bold)),
                        Text(''),
                        Text('     GP: ' + yourTeams[index].gp,
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: 20)),
                        Text('     Win-Loss: ' + yourTeams[index].winLoss,
                            style: TextStyle(fontSize: 20)),
                        Text('     PCT: ' + yourTeams[index].pct,
                            style: TextStyle(fontSize: 20)),
                        Text('     GF: ' + yourTeams[index].gf,
                            style: TextStyle(fontSize: 20)),
                        Text('     GA: ' + yourTeams[index].ga,
                            style: TextStyle(fontSize: 20)),
                        Text('     Last 10: ' + yourTeams[index].l10,
                            style: TextStyle(fontSize: 20)),
                        Text('     Streak: ' + yourTeams[index].streak,
                            style: TextStyle(fontSize: 20)),
                        Text('     PTS: ' + yourTeams[index].pts,
                            style: TextStyle(fontSize: 20)),
                        Text(''),
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
      length: 4,
      child: Scaffold(
          appBar: AppBar(
            bottom: TabBar(
              tabs: [
                Tab(icon: Icon(Icons.calendar_today)),
                Tab(text: "Acadia"),
                Tab(text: "Opponents"),
                Tab(icon: Icon(Icons.list_rounded)),
              ],
            ),
            title: RichText(
              text: TextSpan(
                children: [
                  WidgetSpan(
                    child: Icon(Icons.sports_basketball,
                        size: 22, color: Colors.white),
                  ),
                  TextSpan(
                    text: " Axemen Basketball",
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

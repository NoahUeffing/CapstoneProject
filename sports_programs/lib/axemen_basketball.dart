import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;
import 'dart:async';
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'dart:io' show Platform;
import './presentation/my_flutter_app_icons.dart';

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

class Roster {
  final List<Player> players;
  Roster({this.players});
  factory Roster.fromJson(List<dynamic> parsedJson) {
    List<Player> players = new List<Player>();
    players = parsedJson.map((i) => Player.fromJson(i)).toList();
    return new Roster(players: players);
  }
}

class Schedule {
  final List<Game> games;
  Schedule({this.games});
  factory Schedule.fromJson(List<dynamic> parsedJson) {
    List<Game> games = new List<Game>();
    games = parsedJson.map((i) => Game.fromJson(i)).toList();
    return new Schedule(games: games);
  }
}

class Standings {
  final List<Team> teams;
  Standings({this.teams});
  factory Standings.fromJson(List<dynamic> parsedJson) {
    List<Team> teams = new List<Team>();
    teams = parsedJson.map((i) => Team.fromJson(i)).toList();
    return new Standings(teams: teams);
  }
}

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
  Future<Roster> futureRoster;
  Future<Schedule> futureSchedule;
  Future<Standings> futureStandings;

  @override
  void initState() {
    super.initState();
    futureRoster = fetchRoster();
    futureSchedule = fetchSchedule();
    futureStandings = fetchStandings();
    //if (Platform.isAndroid) WebView.platform = SurfaceAndroidWebView();
  }

  final urlList = [
    'https://www.gocapersgo.ca/sports/mbkb/2020-21/roster',
    'https://daltigers.ca/sports/mbkb/2020-21/roster',
    'https://www.goseahawks.ca/sports/mbkb/2019-20/roster',
    'https://goredsgo.ca/sports/mbkb/2019-20/roster',
    'https://www.gopanthersgo.ca/sports/mbkb/2020-21/roster',
    'https://www.smuhuskies.ca/sports/mbkb/2020-21/roster',
    'https://www.goxgo.ca/sports/mbkb/2020-21/roster',
  ];

  final colorsList = [
    Colors.orange[900],
    Colors.black,
    Colors.pink[900],
    Colors.redAccent[700],
    Colors.green[800],
    Colors.pink[900],
    Colors.blue[900],
  ];

  final iconsList = [
    MyFlutterApp.cbu,
    MyFlutterApp.dal,
    MyFlutterApp.mun,
    MyFlutterApp.unb,
    MyFlutterApp.upei,
    MyFlutterApp.smu,
    MyFlutterApp.stfx,
  ];

  final teamsList = [
    'Cape Breton',
    'Dalhousie',
    'Memorial',
    'UNB',
    'UPEI',
    "Saint Mary's",
    'STFX'
  ];

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

  Widget _buildList() {
    return TabBarView(
      children: [
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
                              yourGames[index].homeAway +
                              ' ' +
                              yourGames[index].opponent +
                              '\n' +
                              yourGames[index].status +
                              ' ' +
                              yourGames[index].score,
                          style: TextStyle(
                            fontSize: 18,
                            //fontWeight: FontWeight.bold,
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
                            //fontWeight: FontWeight.bold,
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
        /*WebView(
          initialUrl: 'https://daltigers.ca/sports/mbkb/2020-21/roster',
          javascriptMode: JavascriptMode.unrestricted,
        ),*/
        _buildOpponents(),
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
                      height: 190,
                      child: Text(
                          yourTeams[index].team +
                              '\nGP: ' +
                              yourTeams[index].gp +
                              '\nWin-Loss: ' +
                              yourTeams[index].winLoss +
                              '\nPCT: ' +
                              yourTeams[index].pct +
                              '\nGF: ' +
                              yourTeams[index].gf +
                              '\nGA: ' +
                              yourTeams[index].ga +
                              '\nLast 10: ' +
                              yourTeams[index].l10 +
                              '\nStreak: ' +
                              yourTeams[index].streak +
                              '\nPTS: ' +
                              yourTeams[index].pts,
                          style: TextStyle(
                            fontSize: 18,
                            //fontWeight: FontWeight.bold,
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

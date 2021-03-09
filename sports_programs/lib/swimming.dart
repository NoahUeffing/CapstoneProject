import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;
import 'dart:async';
import 'dart:convert';

Future<Roster> fetchRoster() async {
  final response = await http.get(globals.api + '/swimmers');

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

/*Future<Schedule> fetchSchedule() async {
  final response = await http.get(Uri.https(globals.api, '/swimmingEvents'));
  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Schedule.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load schedule');
  }
}*/

class Roster {
  final List<Player> players;
  Roster({this.players});
  factory Roster.fromJson(List<dynamic> parsedJson) {
    List<Player> players = new List<Player>();
    players = parsedJson.map((i) => Player.fromJson(i)).toList();
    return new Roster(players: players);
  }
}

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
      name: json['name'],
      yr: json['yr'],
      club: json['club'],
      town: json['town'],
    );
  }
}

/*class Schedule {
  final String id;
  final DateTime date;
  final String teams;
  final String event;
  final String results;

  Schedule({this.id, this.date, this.teams, this.event, this.results});

  factory Schedule.fromJson(Map<String, dynamic> json) {
    return Schedule(
      id: json['_id'],
      date: json['date'],
      teams: json['teams'],
      event: json['event'],
      results: json['results'],
    );
  }
}*/

class Swimming extends StatefulWidget {
  @override
  SwimmingState createState() => SwimmingState();
}

class SwimmingState extends State<Swimming> {
  Future<Roster> futureRoster;
  //Future<Schedule> futureSchedule;

  @override
  void initState() {
    super.initState();
    futureRoster = fetchRoster();
    //futureSchedule = fetchSchedule();
  }

  Widget _buildList() {
    return TabBarView(
      children: [
        Text("Placeholder"),
        /*FutureBuilder<Schedule>(
              future: futureSchedule,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return Text(snapshot.data.event);
                } else if (snapshot.hasError) {
                  return Text("${snapshot.error}");
                }

                // By default, show a loading spinner.
                return CircularProgressIndicator();
              },
            ),*/
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
                      height: 85,
                      child: Text(
                        yourPlayers[index].name.toString() +
                            ' - ' +
                            yourPlayers[index].yr.toString() +
                            ' year\nFormer Club: ' +
                            yourPlayers[index].club.toString() +
                            '\nHometown: ' +
                            yourPlayers[index].town.toString(),
                        style: TextStyle(fontSize: 18),
                      ));
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
                    child: Icon(Icons.pool, size: 22, color: Colors.white),
                  ),
                  TextSpan(
                    text: " Acadia Swimming",
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

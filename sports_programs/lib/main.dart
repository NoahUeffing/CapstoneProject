import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        theme: ThemeData(primaryColor: Colors.red[900]),
        home: TeamNavigation());
  }
}

class TeamNavigation extends StatefulWidget {
  @override
  TeamNavigationState createState() => TeamNavigationState();
}

class TeamNavigationState extends State<TeamNavigation> {
  final sports = [
    'Axemen Basketball',
    'Axewomen Basketball',
    'Axewomen Cross Country',
    'Axemen Football',
    'Axemen Hockey',
    'Axewomen Rugby',
    'Axemen Soccer',
    'Axewomen Soccer',
    'Axemen and Axewomen Swimming',
    'Axewomen Volleyball'
  ];
  final iconsList = [
    Icons.sports_basketball,
    Icons.sports_basketball,
    Icons.directions_run,
    Icons.sports_football,
    Icons.sports_hockey,
    Icons.sports_rugby,
    Icons.sports_soccer,
    Icons.sports_soccer,
    Icons.pool,
    Icons.sports_volleyball
  ];
  final colorCodes = [Colors.lightBlue[900], Colors.red[900]];

  Widget _buildList() {
    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: sports.length,
      itemBuilder: (BuildContext context, int index) {
        return Container(
          height: 65,
          color: colorCodes[index % 2],
          child: Center(
              child: RichText(
            text: TextSpan(
              children: [
                WidgetSpan(
                  child: Icon(iconsList[index], size: 22, color: Colors.white),
                ),
                TextSpan(
                    text: ' ${sports[index]}',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        fontSize: 18)),
              ],
            ),
          )),
        );
      },
      separatorBuilder: (BuildContext context, int index) => const Divider(),
    );
  }

  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Choose a Sport')), body: _buildList());
  }
}

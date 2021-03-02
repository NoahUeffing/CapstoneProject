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
              child: Text('${sports[index]}',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      fontSize: 18))),
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

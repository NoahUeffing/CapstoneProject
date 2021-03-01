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
  Widget _buildList() {
    return ListView(
      padding: const EdgeInsets.all(8),
      children: <Widget>[
        Container(
          height: 80,
          color: Colors.lightBlue[900],
          child: const Center(
              child: Text('Axemen Basketball',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.red[900],
          child: const Center(
              child: Text('Axewomen Basketball',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.lightBlue[900],
          child: const Center(
              child: Text('Axewomen Cross Country',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.red[900],
          child: const Center(
              child: Text('Axemen Football',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.lightBlue[900],
          child: const Center(
              child: Text('Axemen Hockey',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.red[900],
          child: const Center(
              child: Text('Axewomen Rugby',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.lightBlue[900],
          child: const Center(
              child: Text('Axemen Soccer',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.red[900],
          child: const Center(
              child: Text('Axewomen Soccer',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.lightBlue[900],
          child: const Center(
              child: Text('Axemen and Axewomen Swimming',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        Container(
          height: 80,
          color: Colors.red[900],
          child: const Center(
              child: Text('Axewomen Volleyball',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ),
      ],
    );
  }

  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Choose a Sport')), body: _buildList());
  }
}

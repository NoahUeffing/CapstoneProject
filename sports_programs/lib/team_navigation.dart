import 'package:flutter/material.dart';
import './axemen_basketball.dart';
import './axewomen_basketball.dart';
import './axewomen_cross_country.dart';
import './axemen_football.dart';
import './axemen_hockey.dart';
import './axewomen_rugby.dart';
import './axemen_soccer.dart';
import './axewomen_soccer.dart';
import './swimming.dart';
import './axewomen_volleyball.dart';

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

  final pagesList = [
    AxemenBasketball(),
    AxewomenBasketball(),
    AxewomenCrossCountry(),
    AxemenFootball(),
    AxemenHockey(),
    AxewomenRugby(),
    AxemenSoccer(),
    AxewomenSoccer(),
    Swimming(),
    AxewomenVolleyball(),
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
              child: TextButton.icon(
                  icon: Icon(iconsList[index], size: 22, color: Colors.white),
                  label: Text(' ${sports[index]}',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          fontSize: 18)),
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => pagesList[index],
                        ));
                  })),
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

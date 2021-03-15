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
import 'globals.dart' as globals;

class TeamNavigation extends StatefulWidget {
  @override
  TeamNavigationState createState() => TeamNavigationState();
}

// Each list must have elements added in associated order. Ex. sports[0] will
// display the related sport name with the icon given by iconsList[0], and
// link to the page given by pagesList[0].
class TeamNavigationState extends State<TeamNavigation> {
  // Titles for each button
  final sports = [
    'Axemen Basketball',
    'Axewomen Basketball',
    'Axewomen Cross Country',
    'Axemen Football',
    'Axemen Hockey',
    'Axewomen Rugby',
    'Axemen Soccer',
    'Axewomen Soccer',
    'Axemen & Axewomen Swimming',
    'Axewomen Volleyball'
  ];
  // Icons for each button
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
  // Pages for each button to link to
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
  // Colours to alternate between for sport buttons.
  final colorCodes = [globals.acadiaBlue, globals.acadiaRed];

  // Creates the list of buttons with links to sports pages.
  Widget _buildList() {
    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: sports.length,
      itemBuilder: (BuildContext context, int index) {
        // Create button for each sport
        return Container(
          height: 65,
          color: colorCodes[index % 2],
          child: Center(
              child: TextButton.icon(
                  icon: Icon(iconsList[index], size: 22, color: Colors.white),
                  label: Text('${sports[index]}',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          fontSize: 18)),
                  // When button pressed, link to the related sport page
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

  // Creates the team navigation page of the application with appBar and list of buttons.
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Choose a Sport')), body: _buildList());
  }
}

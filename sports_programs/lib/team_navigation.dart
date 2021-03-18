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
    globals.menBasketBallTitle,
    globals.womenBasketballTitle,
    globals.womenCrossCountryTitle,
    globals.menFootballTitle,
    globals.menHockeyTitle,
    globals.womenRugbyTitle,
    globals.menSoccerTitle,
    globals.womenSoccerTitle,
    globals.swimmingTitle,
    globals.womenVolleyTitle
  ];
  // Icons for each button
  final iconsList = [
    globals.basketballIcon,
    globals.basketballIcon,
    globals.crossCountryIcon,
    globals.footballIcon,
    globals.hockeyIcon,
    globals.rugbyIcon,
    globals.soccerIcon,
    globals.soccerIcon,
    globals.swimmingIcon,
    globals.volleyIcon
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
      padding: const EdgeInsets.all(globals.defaultPadding),
      itemCount: sports.length,
      itemBuilder: (BuildContext context, int index) {
        // Create button for each sport
        return Container(
          height: 65,
          color: colorCodes[index % 2],
          child: Center(
              child: TextButton.icon(
                  icon: Icon(iconsList[index],
                      size: globals.titleSize, color: globals.titleColor),
                  label: Text('${sports[index]}', style: globals.titleFont),
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
        appBar: AppBar(
            title: Text(
          'Choose a Sport',
          style: globals.titleFont,
        )),
        body: _buildList());
  }
}

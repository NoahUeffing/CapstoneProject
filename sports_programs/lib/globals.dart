// This file contains global variables to be used in other dart files.
// Accessed by using import 'globals.dart' as globals; into a dart file
// and then using globals.<variablename> to access the desired variable.
library my_prj.globals;

import 'package:flutter/material.dart';
import './presentation/my_flutter_app_icons.dart';

// For using the localhost api
// Andorid uses 10.0.2.2 as an address to localhost
const iosApi = "http://localhost:5000/api";
const androidApi = "http://10.0.2.2:5000/api";

// colours
final acadiaRed = Colors.red[900];
final acadiaBlue = Colors.lightBlue[900];
final cbuOrange = Colors.orange[900];
final dalBlack = Colors.black;
final munPink = Colors.red[900];
final unbRed = Colors.redAccent[700];
final upeiGreen = Colors.green[800];
final smuPink = Colors.pink[900];
final stfxBlue = Colors.blue[900];
final tableRowColor = Colors.red[50];
final bishopPurple = Colors.purple[900];
final mtaGold = Colors.amberAccent[700];
final monctonBlue = Colors.blue[900];
final stuGreen = Colors.green[900];

// font
final defaultFont = TextStyle(fontSize: 18);
final titleFont =
    TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white);
final titleColor = Colors.white;
final double titleSize = 22;
final tableFontStyle = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.bold,
    fontStyle: FontStyle.italic,
    color: Colors.white);

// titles
final shortRosterTitle = "Acadia";
final longRosterTitle = "Acadia Roster";
final awayRosterTitle = "Opponents";
final womenCrossCountryTitle = "Axewomen Cross Country";
final swimmingTitle = "Acadia Swimming";
final menBasketBallTitle = 'Axemen Basketball';
final womenBasketballTitle = 'Axewomen Basketball';
final menFootballTitle = 'Axemen Football';
final menHockeyTitle = 'Axemen Hockey';
final womenRugbyTitle = 'Axewomen Rugby';
final menSoccerTitle = 'Axemen Soccer';
final womenSoccerTitle = 'Axewomen Soccer';
final womenVolleyTitle = 'Axewomen Volleyball';

// icons
final standingsIcon = Icons.list_rounded;
final crossCountryIcon = Icons.directions_run;
final scheduleIcon = Icons.calendar_today;
final swimmingIcon = Icons.pool;
final basketballIcon = Icons.sports_basketball;
final footballIcon = Icons.sports_football;
final hockeyIcon = Icons.sports_hockey;
final rugbyIcon = Icons.sports_rugby;
final soccerIcon = Icons.sports_soccer;
final volleyIcon = Icons.sports_volleyball;

final acadiaIcon = MyFlutterApp.acadia;
final cbuIcon = MyFlutterApp.cbu;
final dalIcon = MyFlutterApp.dal;
final monctonIcon = MyFlutterApp.moncton;
final munIcon = MyFlutterApp.mun;
final unbIcon = MyFlutterApp.unb;
final upeiIcon = MyFlutterApp.upei;
final smuIcon = MyFlutterApp.smu;
final stfxIcon = MyFlutterApp.stfx;
final bishopIcon = MyFlutterApp.bishop;
final mtaIcon = MyFlutterApp.mta;
final stuIcon = MyFlutterApp.stu;

// padding
const double defaultPadding = 20;

// date
final dateFormat = "MMMEd";

// Opponent names
final cbuName = 'Cape Breton';
final dalName = 'Dalhousie';
final munName = 'Memorial';
final monctonName = 'Moncton';
final unbName = 'UNB';
final upeiName = 'UPEI';
final smuName = "Saint Mary's";
final stuName = "  St. Thomas";
final stfxName = 'StFX';
final bishopName = "Bishop's";
final mtaName = "Mount Allison";

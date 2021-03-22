import 'package:flutter/material.dart';
import './team_navigation.dart';
import 'globals.dart' as globals;

// Main file for the app. Run this file to build the application.
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primaryColor: globals.acadiaRed),
      home: TeamNavigation(),
      debugShowCheckedModeBanner: false,
    );
  }
}

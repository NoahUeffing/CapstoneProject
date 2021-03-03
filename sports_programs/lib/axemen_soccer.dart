import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxemenSoccer extends StatefulWidget {
  @override
  AxemenSoccerState createState() => AxemenSoccerState();
}

class AxemenSoccerState extends State<AxemenSoccer> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose a Soccer Game"),
      ),
      body: Center(),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxewomenSoccer extends StatefulWidget {
  @override
  AxewomenSoccerState createState() => AxewomenSoccerState();
}

class AxewomenSoccerState extends State<AxewomenSoccer> {
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

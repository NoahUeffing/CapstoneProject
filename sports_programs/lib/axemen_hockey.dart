import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxemenHockey extends StatefulWidget {
  @override
  AxemenHockeyState createState() => AxemenHockeyState();
}

class AxemenHockeyState extends State<AxemenHockey> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose a Hockey Game"),
      ),
      body: Center(),
    );
  }
}

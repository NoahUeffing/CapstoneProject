import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxemenFootball extends StatefulWidget {
  @override
  AxemenFootballState createState() => AxemenFootballState();
}

class AxemenFootballState extends State<AxemenFootball> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose a Football Game"),
      ),
      body: Center(),
    );
  }
}

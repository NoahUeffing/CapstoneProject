import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Swimming extends StatefulWidget {
  @override
  SwimmingState createState() => SwimmingState();
}

class SwimmingState extends State<Swimming> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose a Swimming Event"),
      ),
      body: Center(),
    );
  }
}

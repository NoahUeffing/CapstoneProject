import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxewomenCrossCountry extends StatefulWidget {
  @override
  AxewomenCrossCountryState createState() => AxewomenCrossCountryState();
}

class AxewomenCrossCountryState extends State<AxewomenCrossCountry> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose a Cross Country Event"),
      ),
      body: Center(),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxewomenVolleyball extends StatefulWidget {
  @override
  AxewomenVolleyballState createState() => AxewomenVolleyballState();
}

class AxewomenVolleyballState extends State<AxewomenVolleyball> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose a Volleyball Game"),
      ),
      body: Center(),
    );
  }
}

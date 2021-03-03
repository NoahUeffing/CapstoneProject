import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxewomenRugby extends StatefulWidget {
  @override
  AxewomenRugbyState createState() => AxewomenRugbyState();
}

class AxewomenRugbyState extends State<AxewomenRugby> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose a Rugby Game"),
      ),
      body: Center(),
    );
  }
}

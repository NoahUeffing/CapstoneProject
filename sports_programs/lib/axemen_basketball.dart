import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxemenBasketball extends StatefulWidget {
  @override
  AxemenBasketballState createState() => AxemenBasketballState();
}

class AxemenBasketballState extends State<AxemenBasketball> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose a Basketball Game"),
      ),
      body: Center(),
    );
  }
}

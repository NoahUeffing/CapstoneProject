import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxewomenBasketball extends StatefulWidget {
  @override
  AxewomenBasketballState createState() => AxewomenBasketballState();
}

class AxewomenBasketballState extends State<AxewomenBasketball> {
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

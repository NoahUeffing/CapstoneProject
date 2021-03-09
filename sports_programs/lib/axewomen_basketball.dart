import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxewomenBasketball extends StatefulWidget {
  @override
  AxewomenBasketballState createState() => AxewomenBasketballState();
}

class AxewomenBasketballState extends State<AxewomenBasketball> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          bottom: TabBar(
            tabs: [
              Tab(icon: Icon(Icons.calendar_today)),
              Tab(text: "Acadia"),
              Tab(text: "Opponents"),
              Tab(icon: Icon(Icons.list_rounded)),
            ],
          ),
          title: RichText(
            text: TextSpan(
              children: [
                WidgetSpan(
                  child: Icon(Icons.sports_basketball,
                      size: 22, color: Colors.white),
                ),
                TextSpan(
                  text: " Axewomen Basketball",
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      fontSize: 22),
                ),
              ],
            ),
          ),
        ),
        body: Center(),
      ),
    );
  }
}

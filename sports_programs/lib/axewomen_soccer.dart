import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxewomenSoccer extends StatefulWidget {
  @override
  AxewomenSoccerState createState() => AxewomenSoccerState();
}

class AxewomenSoccerState extends State<AxewomenSoccer> {
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
                  child:
                      Icon(Icons.sports_soccer, size: 22, color: Colors.white),
                ),
                TextSpan(
                  text: " Axewomen Soccer",
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

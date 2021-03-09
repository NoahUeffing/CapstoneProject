import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Swimming extends StatefulWidget {
  @override
  SwimmingState createState() => SwimmingState();
}

class SwimmingState extends State<Swimming> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          bottom: TabBar(
            tabs: [
              Tab(icon: Icon(Icons.calendar_today)),
              Tab(text: "Acadia Roster"),
            ],
          ),
          title: RichText(
            text: TextSpan(
              children: [
                WidgetSpan(
                  child: Icon(Icons.pool, size: 22, color: Colors.white),
                ),
                TextSpan(
                  text: " Acadia Swimming",
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      fontSize: 22),
                ),
              ],
            ),
          ),
        ),
        /*body: TabBarView(
          children: [
            ,
            ,
          ],
        ),*/
      ),
    );
  }
}

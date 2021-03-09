import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AxewomenCrossCountry extends StatefulWidget {
  @override
  AxewomenCrossCountryState createState() => AxewomenCrossCountryState();
}

class AxewomenCrossCountryState extends State<AxewomenCrossCountry> {
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
                  child:
                      Icon(Icons.directions_run, size: 22, color: Colors.white),
                ),
                TextSpan(
                  text: " Axewomen X-Country",
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

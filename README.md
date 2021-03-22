# CapstoneProject

This project acts as a digital replacement to Acadia University Athletics game programs and was created for
course credit for COMP 4983 at Acadia University.

# Main Files and Directories

- config
  Contains files to connect the mongodb database to the application.

- data
  Contains the JSON arrays that are output when running the web scrapers.

- models
  Contains all models used by mongoose to create and read data from the database.

- routes
  Contains all API routes for all GET, POST, PUT, DELETE and requests.

- sports_programs
  Contains the files needed for the flutter frontend.

- sports_programs/fonts
  Contains the font file for all AUS icons.

- sports_programs/launcher_icon
  Contains the picture used as the homescreen icon

- sports_programs/lib
  Contains all pages for the mobile application as well as the main.dart file
  used to run the app.

- sports_programs/lib/presentation
  Contains each AUS flutter icon.

- server.js
  Sets up the server so that the frontend can interact with the API.

# To Install Dependencies

Install node.js: https://nodejs.org/en/

Install flutter and iOS and/or Android emulators: https://flutter.dev/docs/get-started/install

In the main directory and also the /scrapers directory, run the command "npm install".

# To Update Database

In the scrapers directory, use the command "./update.sh" to run all scrapers and replace all database data
with the new json documents.

# To Run Server

From the main directory run the command "npm run server". This will run the server on port 5000.

# To Run Application

Using the mobile emulator of your choice, run the file "acadia_programs/sports_programs/lib/main.dart".

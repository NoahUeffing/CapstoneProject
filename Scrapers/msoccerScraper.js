const puppeteer = require("puppeteer");
const chalk = require("chalk");
var fs = require("fs");

// Added colour to console.logs for debugging.
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page and wait for required selectors
    await page.goto(`https://www.usports.ca/en/sports/soccer/m/teams/283289`);
    await page.waitForSelector("#so_teamSchedule > table > tbody > tr > td:nth-child(1)");
    await page.waitForSelector("#so_teamSchedule > table > tbody > tr > td:nth-child(3)"); 
    await page.waitForSelector("#so_teamSchedule > table > tbody > tr > td:nth-child(4)");
    await page.waitForSelector("#so_teamSchedule > table > tbody > tr > td:nth-child(6)"); 
    await page.waitForSelector("#so_teamSchedule > table > tbody > tr > td:nth-child(7)");
    // create lists for each selector
    var data = await page.evaluate(() => {
      var dateList = document.querySelectorAll(`#so_teamSchedule > table > tbody > tr > td:nth-child(1)`);
      var awayTeamList = document.querySelectorAll(`#so_teamSchedule > table > tbody > tr > td:nth-child(3)`);
      var awayScoreList = document.querySelectorAll(`#so_teamSchedule > table > tbody > tr > td:nth-child(4)`);
      var homeScoreList = document.querySelectorAll(`#so_teamSchedule > table > tbody > tr > td:nth-child(6)`);
      var homeTeamList = document.querySelectorAll(`#so_teamSchedule > table > tbody > tr > td:nth-child(7)`);
      // makes an array of data to create json objects
      var scheduleArray = [];
      for (var i = 0; i < dateList.length; i++) {
        scheduleArray[i] = {
          date: dateList[i].innerText.trim(),
          awayTeam: awayTeamList[i].innerText.trim(),
          awayScore: awayScoreList[i].innerText.trim(),
          homeScore: homeScoreList[i].innerText.trim(),
          homeTeam: homeTeamList[i].innerText.trim()
        };
      }
      return scheduleArray;
    });
    // close headless browser
    await browser.close();
    // Writing the schedule/scores inside a json file
    fs.writeFile("msoccerschedule.json", JSON.stringify(data), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catches and displays errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();
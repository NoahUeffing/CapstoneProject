// Working Apr 12 2021
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
    await page.goto(
      `https://www.acadiaathletics.ca/sports/mice/2020-21/schedule`
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div.date"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div.va"
    );
    await page.waitForSelector(
      "#mainbody > div > div> div > div > div > div > div > div.opponent > span > span"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div.status"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div.result"
    );
    // create lists for each selector
    var data = await page.evaluate(() => {
      var dateList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div.date`
      );
      var homeAwayList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div.va`
      );
      var opponentList = document.querySelectorAll(
        `#mainbody > div > div> div > div > div > div > div > div.opponent > span > span`
      );
      var statusList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div.status`
      );
      var scoreList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div.result`
      );
      // makes an array of data to create json objects
      var scheduleArray = [];
      for (var i = 0; i < dateList.length; i++) {
        scheduleArray[i] = {
          date: dateList[i].getAttribute("title"),
          homeAway: homeAwayList[i].innerText.trim(),
          opponent: opponentList[i].innerText.trim(),
          status: statusList[i].innerText.trim(),
          score: scoreList[i].innerText.trim(),
        };
      }
      return scheduleArray;
    });
    // close headless browser
    await browser.close();
    // Writing the schedule/scores inside a json file
    fs.writeFile(
      __dirname + "/../data/mhockeySchedule.json",
      JSON.stringify(data),
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catches and displays errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();

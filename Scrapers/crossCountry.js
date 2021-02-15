// Seems to work Jan 26 2021
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
      `https://www.acadiaathletics.ca/sports/wxc/2020-21/schedule`
    );
    await page.waitForSelector(
      "#schedule-list > div.schedule-content.clearfix > table > tbody > tr > td.e_date"
    );
    await page.waitForSelector(
      "#schedule-list > div.schedule-content.clearfix > table > tbody > tr > td.e_neutralsite"
    );
    await page.waitForSelector(
      "#schedule-list > div.schedule-content.clearfix > table > tbody > tr > td.e_result.e_awayresult"
    );
    await page.waitForSelector(
      "#schedule-list > div.schedule-content.clearfix > table > tbody > tr > td.e_links"
    );
    // create lists for each selector
    var data = await page.evaluate(() => {
      var dateList = document.querySelectorAll(
        `#schedule-list > div.schedule-content.clearfix > table > tbody > tr > td.e_date`
      );
      var eventList = document.querySelectorAll(
        `#schedule-list > div.schedule-content.clearfix > table > tbody > tr > td.e_neutralsite`
      );
      var resultList = document.querySelectorAll(
        `#schedule-list > div.schedule-content.clearfix > table > tbody > tr > td.e_result.e_awayresult`
      );
      var linksList = document.querySelectorAll(
        `#schedule-list > div.schedule-content.clearfix > table > tbody > tr > td.e_links`
      );
      // makes an array of data to create json objects
      var scheduleArray = [];
      for (var i = 0; i < dateList.length; i++) {
        scheduleArray[i] = {
          date: dateList[i].innerText.trim(),
          event: eventList[i].innerText.trim(),
          result: resultList[i].innerText.trim(),
          links: linksList[i].innerText.trim(),
        };
      }
      return scheduleArray;
    });
    // close headless browser
    await browser.close();
    // Writing the schedule/scores inside a json file
    fs.writeFile(
      __dirname + "/../Data/crossschedule.json",
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

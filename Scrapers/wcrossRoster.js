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
    await page.goto(`https://www.acadiaathletics.ca/sports/wxc/2019-20/roster`);
    await page.waitForSelector("#mainbody > div.mod-roster > div.roster > table > tbody > tr > th > a");
    await page.waitForSelector("#mainbody > div.mod-roster > div.roster > table > tbody > tr > td:nth-child(2)");
    await page.waitForSelector("#mainbody > div.mod-roster > div.roster > table > tbody > tr > td:nth-child(3)");
    // create lists for each selector
    var data = await page.evaluate(() => {
      var nameList = document.querySelectorAll(`#mainbody > div.mod-roster > div.roster > table > tbody > tr > th > a`);
      var yrList = document.querySelectorAll(`#mainbody > div.mod-roster > div.roster > table > tbody > tr > td:nth-child(2)`);
      var townList = document.querySelectorAll(`#mainbody > div.mod-roster > div.roster > table > tbody > tr > td:nth-child(3)`);
      // makes an array of data to create json objects
      var rosterArray = [];
      for (var i = 0; i < nameList.length; i++) {
        rosterArray[i] = {
          name: nameList[i].innerText.trim(),
          yr: yrList[i].innerText.trim(),
          town: townList[i].innerText.trim(),
        };
      }
      return rosterArray;
    });
    // close headless browser
    await browser.close();
    // Writing the schedule/scores inside a json file
    fs.writeFile("wcrossTeam.json", JSON.stringify(data), function (err) {
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
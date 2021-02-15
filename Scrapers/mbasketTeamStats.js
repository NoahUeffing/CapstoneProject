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
    await page.goto(`http://www.acadiaathletics.ca/sports/mbkb/2019-20/standings`);
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td.stats-team.pinned-col > a");
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(2)"); 
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(3)"); 
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(4)");
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(5)"); 
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(6)"); 
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(13)"); 
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(14)"); 
    await page.waitForSelector("#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td.stats-field.points");
    // create lists for each selector
    var data = await page.evaluate(() => {
      var teamList = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td.stats-team.pinned-col > a`);
      var gpList = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(2)`);
      var winLossList = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(3)`);
      var pctList = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(4)`);
      var gfList = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(5)`);
      var gaList = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(6)`);
      var l10List = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(13)`);
      var streakList = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td:nth-child(14)`);
      var ptsList = document.querySelectorAll(`#mainbody > div.full-standings.clearfix > div > div.overflow > div > table > tbody > tr > td.stats-field.points`);

      // makes an array of data to create json objects
      var statsArray = [];
      for (var i = 0; i < teamList.length; i++) {
        statsArray[i] = {
          team: teamList[i].innerText.trim(),
          gp: gpList[i].innerText.trim(),
          winLoss: winLossList[i].innerText.trim(),
          pct: pctList[i].innerText.trim(),
          gf: gfList[i].innerText.trim(),
          ga: gaList[i].innerText.trim(),
          l10: l10List[i].innerText.trim(),
          streak: streakList[i].innerText.trim(),
          pts: ptsList[i].innerText.trim(),
        };
      }
      return statsArray;
    });
    // close headless browser
    await browser.close();
    // Writing the schedule/scores inside a json file
    fs.writeFile("mbasketStats.json", JSON.stringify(data), function(err) {
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
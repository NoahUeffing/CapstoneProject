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
      `https://acadiaathletics.ca/sports/mbkb/2019-20/teams/acadia?view=lineup&r=0&pos=sh`,
      { waitUntil: "domcontentloaded" }
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.active.clearfix > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(1)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td.text.pinned-col > a"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(3)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(4)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(5)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(6)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(7)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(8)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(9)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(10)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(11)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(12)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(13)"
    );
    await page.waitForSelector(
      "#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(14)"
    );
    // create lists for each selector
    var data = await page.evaluate(() => {
      var numberList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(1)`
      );
      var playerList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td.text.pinned-col > a`
      );
      var yrList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(3)`
      );
      var posList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(4)`
      );
      var gpList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(5)`
      );
      var gsList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(6)`
      );
      var mpgList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(7)`
      );
      var FG_Glist = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(8)`
      );
      var PCTList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(9)`
      );
      var tpgList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(10)`
      );
      var tppctList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(11)`
      );
      var FTGList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(12)`
      );
      var FTPList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(13)`
      );
      var ppgList = document.querySelectorAll(
        `#mainbody > div.stats-container.stats-responsive-container.l > div.tab-container.primary.clearfix > div.tab-panels.clearfix > div.tab-panel.clearfix.active > div > div.tab-panels.clearfix > div.tab-panel.active > div > div.tab-panels.tab-panels-floated.clearfix > div.tab-panel.clearfix.active > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(14)`
      );

      // makes an array of data to create json objects
      var statsArray = [];
      for (var i = 0; i < numberList.length; i++) {
        statsArray[i] = {
          Number: numberList[i].innerText.trim(),
          Player: playerList[i].innerText.trim(),
          Year: yrList[i].innerText.trim(),
          Position: posList[i].innerText.trim(),
          GP: gpList[i].innerText.trim(),
          GS: gsList[i].innerText.trim(),
          MPG: mpgList[i].innerText.trim(),
          FG_G: FG_Glist[i].innerText.trim(),
          PCT: PCTList[i].innerText.trim(),
          THREE_PT_G: tpgList[i].innerText.trim(),
          TP_PCT: tppctList[i].innerText.trim(),
          FT_G: FTGList[i].innerText.trim(),
          FTP: FTPList[i].innerText.trim(),
          PPG: ppgList[i].innerText.trim(),
        };
      }
      return statsArray;
    });
    // close headless browser
    await browser.close();
    // Writing the schedule/scores inside a json file
    fs.writeFile(
      __dirname + "/../Data/mbasketPlayerStats.json",
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

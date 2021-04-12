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
      `https://acadiaathletics.ca/sports/mbkb/2019-20/teams/acadia?view=lineup&r=0&pos=sh`,
      { waitUntil: "domcontentloaded" }
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(1)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td > a"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(3)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(4)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(5)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(6)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(7)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(8)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(9)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(10)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(11)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(12)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(13)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(14)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(15)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(16)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div > div > div > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(17)"
    );
    // create lists for each selector
    var data = await page.evaluate(() => {
      var numberList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(1)`
      );
      var playerList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(2)`
      );
      var yrList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(3)`
      );
      var posList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(4)`
      );
      var gpList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(5)`
      );
      var gsList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(6)`
      );
      var mpgList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(7)`
      );
      var OFF_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(8)`
      );
      var DEF_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(9)`
      );
      var REB_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(10)`
      );
      var PF_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(11)`
      );
      var DQ_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(12)`
      );
      var AST_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(13)`
      );
      var TO_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(14)`
      );
      var A_TOList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(15)`
      );
      var STL_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(16)`
      );
      var BLK_GList = document.querySelectorAll(
        `#mainbody > div > div > div > div.tab-panel.clearfix.active > div > div > div.tab-panel.active > div > div > div.tab-panel.clearfix.active > div:nth-child(5) > div > div > div > table > tbody > tr > td:nth-child(17)`
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
          OFF_G: OFF_GList[i].innerText.trim(),
          DEF_G: DEF_GList[i].innerText.trim(),
          REB_G: REB_GList[i].innerText.trim(),
          PF_G: PF_GList[i].innerText.trim(),
          DQ_G: DQ_GList[i].innerText.trim(),
          AST_G: AST_GList[i].innerText.trim(),
          TO_G: TO_GList[i].innerText.trim(),
          A_TO: A_TOList[i].innerText.trim(),
          STL_G: STL_GList[i].innerText.trim(),
          BLK_G: BLK_GList[i].innerText.trim(),
        };
      }
      return statsArray;
    });
    // close headless browser
    await browser.close();
    // Writing the schedule/scores inside a json file
    fs.writeFile(
      __dirname + "/../data/mbasketControlStats.json",
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

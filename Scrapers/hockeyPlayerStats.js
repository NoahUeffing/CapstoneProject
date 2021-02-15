// Jan 26 2021 Currently returns two of all results :/
const puppeteer = require("puppeteer");
const chalk = require("chalk");
var fs = require("fs");

// Added colour to console.logs for debugging.
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: false });
    // open a new page
    var page = await browser.newPage();
    // enter url in page and wait for required selectors
    await page.goto(
      `https://www.acadiaathletics.ca/sports/mice/2019-20/teams/acadia?view=lineup&r=0&pos=`,
      { waitUntil: "domcontentloaded" }
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(1)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td > a"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(3)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(4)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(5)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(6)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(7)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(8)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(9)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(10)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(11)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(12)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(13)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(14)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(15)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(16)"
    );
    await page.waitForSelector(
      "#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(17)"
    );
    // create lists for each selector
    var data = await page.evaluate(() => {
      var numberList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(1)`
      );
      var playerList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(2)`
      );
      var yrList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(3)`
      );
      var posList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(4)`
      );
      var gpList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(5)`
      );
      var goalList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(6)`
      );
      var assistList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(7)`
      );
      var ptsList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(8)`
      );
      var pimList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(9)`
      );
      var plusminusList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(10)`
      );
      var ppgList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(11)`
      );
      var shgList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(12)`
      );
      var engList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(13)`
      );
      var gwgList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(14)`
      );
      var gtgList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(15)`
      );
      var hatList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(16)`
      );
      var shotsList = document.querySelectorAll(
        `#mainbody > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > table > tbody > tr > td:nth-child(17)`
      );

      // makes an array of data to create json objects
      console.log(numberList.length);
      var statsArray = [];
      for (var i = 0; i < numberList.length; i++) {
        statsArray[i] = {
          Number: numberList[i].innerText.trim(),
          Player: playerList[i].innerText.trim(),
          Year: yrList[i].innerText.trim(),
          Position: posList[i].innerText.trim(),
          GP: gpList[i].innerText.trim(),
          Goals: goalList[i].innerText.trim(),
          Assists: assistList[i].innerText.trim(),
          PIM: pimList[i].innerText.trim(),
          Plus_Minus: plusminusList[i].innerText.trim(),
          PPG: ppgList[i].innerText.trim(),
          SHG: shgList[i].innerText.trim(),
          ENG: engList[i].innerText.trim(),
          GWG: gwgList[i].innerText.trim(),
          GTG: gtgList[i].innerText.trim(),
          Hat_Tricks: hatList[i].innerText.trim(),
          Shots: shotsList[i].innerText.trim(),
          Points: ptsList[i].innerText.trim(),
        };
      }
      return statsArray;
    });
    // close headless browser
    await browser.close();
    // Writing the schedule/scores inside a json file
    fs.writeFile(
      __dirname + "/../Data/micePlayerStats.json",
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

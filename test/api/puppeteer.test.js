const puppeteer = require('puppeteer');
const tessy = require('../../api/puppeteer');

async function puppeteerTest(browser) {
  const page = await browser.newMonetizedPage();
  await page.goto('https://testwebmonetization.com/demo.html');

  const monEventsCount = await page.evaluate(() => {
    const container = document.querySelector('pre#container');
    return container.childElementCount;
  });

  expect(monEventsCount).not.toBe(0);
  await browser.close();
}

describe('Puppeteer Web Monetization Testing API', () => {
  it("tests Tessy's Puppeteer API live in the browser", async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: false
    });

    tessy(browser);
    await puppeteerTest(browser);
  });

  it("tests Tessy's Puppeteer API in headless mode", async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true
    });

    tessy(browser);
    await puppeteerTest(browser);
  });
});

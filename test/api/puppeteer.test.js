const puppeteer = require('puppeteer');
const tessy = require('../../api/puppeteer');
const { startServer, closeServer } = require('../utils');

async function puppeteerTest(browser) {
  const page = await browser.newMonetizedPage();
  await page.goto('http://localhost:8080');

  const s = await page.evaluate(() => {
    const container = document.querySelector('pre#container');
    return container.childElementCount;
  });

  expect(s).not.toBe(0);
  await browser.close();
}

describe('Puppeteer Web Monetization Testing API', () => {
  beforeAll(startServer);

  it('tests API in browser mode', async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: false
    });

    tessy(browser);
    await puppeteerTest(browser);
  });

  it('tests API in headless mode', async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true
    });

    tessy(browser);
    await puppeteerTest(browser);
  });

  afterAll(closeServer);
});

const tessy = require('../../api/selenium');
const firefox = require('selenium-webdriver/firefox');
const { Builder, Capabilities } = require('selenium-webdriver');

jest.setTimeout(50000);

async function seleniumTest(driver) {
  tessy(driver);

  await driver.getMonetized('https://testwebmonetization.com');

  // Wait for page to fully load
  setTimeout(async () => {
    const headline = await driver.executeScript(
      "return document.querySelector('.headline.my-1').textContent"
    );
    const successMsg = 'Monetization events have occurred on this page!';

    expect(headline.includes(successMsg)).toBe(true);

    await driver.quit();
  }, 3000);
}

describe('Selenium Web Monetization Testing API', () => {
  const capabilities = Capabilities.firefox();
  // Options are 'eager', 'none', 'normal'
  capabilities.setPageLoadStrategy('eager');

  it("tests Tessy's Selenim API live in the browser", async () => {
    const driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(capabilities)
      .build();
driver.ge
    await seleniumTest(driver);
  });

  it("tests Tessy's Selenim API in headless mode", async () => {
    const options = new firefox.Options().headless();
    const driver = await new Builder()
      .forBrowser('firefox')
      .withCapabilities(capabilities)
      .setFirefoxOptions(options)
      .build();

    await seleniumTest(driver);
  });
});

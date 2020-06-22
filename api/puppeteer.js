const { getMonetizationScript } = require('./utils');
const monetizationScript = getMonetizationScript();

/**
 * Opens a new page with Web Monetization enabled
 * @param {Object} pluginOptions options to Tessy
 * @returns {Promise} Promise which resolves to a new Page object.
 */
async function newMonetizedPage(pluginOptions = {}) {
  const page = await this.newPage();

  await page.evaluateOnNewDocument(
    (script, options) => {
      window.monetizationPluginOptions = options;
      eval(script);
      delete window.monetizationPluginOptions;
    },
    monetizationScript,
    pluginOptions
  );

  return page;
}

/**
 * Attaches `newMonetizedPage` method on Puppeteer's browser instance
 * @param {Object} browser Puppeteer's browser instance
 */
module.exports = browser => {
  browser.newMonetizedPage = newMonetizedPage;
};

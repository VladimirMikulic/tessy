const { getMonetizationScript } = require('./utils');
const monetizationScript = getMonetizationScript();

/**
 * Navigates to the given URL with Web Monetization enabled
 * @param {String} url URL to open
 * @param {Object} pluginOptions options to Tessy
 * @returns {Promise} A promise that will be resolved when the document has finished loading.
 */
async function getMonetized(url, pluginOptions = {}) {
  const result = await this.get(url);

  this.executeScript(
    (script, options) => {
      window.seleniumDriver = true;
      window.monetizationPluginOptions = options;

      eval(script);

      delete window.monetizationPluginOptions;
      delete window.seleniumDriver;
    },
    monetizationScript,
    pluginOptions
  );

  return result;
}

/**
 * Attaches `getMonetized` method on Selenium's driver instance
 * @param {Object} browser Selenium's driver instance
 */
module.exports = driver => {
  driver.getMonetized = getMonetized;
};

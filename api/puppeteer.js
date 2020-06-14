const { getMonetizationScript } = require('./utils');
const monetizationScript = getMonetizationScript();

module.exports = browser => {
  browser.newMonetizedPage = async (pluginOptions = {}) => {
    const page = await browser.newPage();

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
  };
};

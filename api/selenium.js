const { getMonetizationScript } = require('./utils');
const monetizationScript = getMonetizationScript();


module.exports = driver => {
  driver.getMonetized = async (url, pluginOptions) => {
    const res = await driver.get(url);

    driver.executeScript(`
        window.monetizationPluginOptions = ${pluginOptions};
        eval(${monetizationScript});
        delete window.monetizationPluginOptions;
    `);

    return res;
  };
};

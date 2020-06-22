/**
 * The script enables Tessy on a webpage.
 * Needs to be present in the <head> before all other scripts.
 * Browser-ready version of this script is ./monetization-browser.js
 */
const {
  initPluginOptions,
  initWebMonetizationAPI,
  simulateWebMonetization
} = require('../src/index');

initWebMonetizationAPI(window);

/**
 * Selenium injects JavaScript very late compared to other
 * tools (Puppeteer, Cypress). onreadystatechange method never
 * executes because the page has already been loaded (sometimes).
 * This requires us to manually call startMonetization().
 */
if (window.seleniumDriver) {
  startMonetization();
}

document.onreadystatechange = startMonetization;

function startMonetization() {
  if (document.readyState === 'complete') {
    initPluginOptions(window.monetizationPluginOptions);
    simulateWebMonetization(window);
  }
}

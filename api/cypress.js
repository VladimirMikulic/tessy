const {
  initPluginOptions,
  initWebMonetizationAPI,
  simulateWebMonetization
} = require('../src/index');
const { isFunction } = require('../src/utils');

function initVisitOptions(options) {
  const visitOptions = options || {};
  return visitOptions;
}

/**
 * Visits a remote URL with Web Monetization enabled
 * @param {String} url URL to visit
 * @param {Object} visitOptions options to Cypress's `visit` method
 * @param {Object} options options to Tessy
 * @returns {Window} yields remote page's `window` object
 */
function visitMonetized(url, visitOptions = {}, options = {}) {
  visitOptions = initVisitOptions(visitOptions);

  return cy.visit(url, {
    ...visitOptions,
    // Initialize fake web monetization API BEFORE the page loads
    onBeforeLoad(window) {
      initWebMonetizationAPI(window);

      if (isFunction(visitOptions.onBeforeLoad)) visitOptions.onBeforeLoad();
    },
    // Simulate web monetization
    onLoad(window) {
      initPluginOptions(options);
      simulateWebMonetization(window);

      if (isFunction(visitOptions.onLoad)) visitOptions.onLoad();
    }
  });
}

/**
 * Attaches `visitMonetized` method on Cypress's instance
 * @param {Object} cy Cypress instance
 */
module.exports = cy => {
  cy.visitMonetized = visitMonetized;
};

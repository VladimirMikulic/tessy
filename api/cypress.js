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

module.exports = cy => {
  cy.visitMonetized = visitMonetized;
};

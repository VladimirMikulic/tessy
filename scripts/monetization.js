const {
  initPluginOptions,
  initWebMonetizationAPI,
  simulateWebMonetization
} = require('../src/index');

initWebMonetizationAPI(window);

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    initPluginOptions(window.monetizationPluginOptions);
    simulateWebMonetization(window);
  }
};

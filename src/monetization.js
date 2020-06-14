const Store = require('./store');
const { emit } = require('./events');

const dispatchStartEvt = emit.bind(null, 'monetizationstart');
const dispatchProgressEvt = emit.bind(null, 'monetizationprogress');

const resumeMonetization = () => {
  let intervalID = Store.getItem('monInterval');
  if (intervalID) return;

  dispatchProgressEvt();
  intervalID = setInterval(dispatchProgressEvt, 1000);
  Store.setItem('monInterval', intervalID);
};

const pauseMonetization = (pauseTime = null) => {
  const intervalID = Store.getItem('monInterval');
  clearInterval(intervalID);
  Store.setItem('monInterval', null);

  if (!pauseTime) return;
  setTimeout(resumeMonetization, pauseTime);
};

const initWebMonetizationAPI = window => {
  const { document } = window;
  Store.setItem('monPageDocument', document);

  document.monetizationExtensionInstalled = true;
  document.monetization = document.createElement('div');

  document.monetization.emit = emit;
  document.monetization.pauseMonetization = pauseMonetization;
  document.monetization.resumeMonetization = resumeMonetization;
};

const simulateWebMonetization = window => {
  const { document } = window;
  if (!document.monetization) {
    throw new Error("Web Monetization API hasn't been initialized.");
  }

  dispatchStartEvt();
  dispatchProgressEvt();

  const intervalID = setInterval(dispatchProgressEvt, 1000);
  Store.setItem('monInterval', intervalID);
};

module.exports = {
  initWebMonetizationAPI,
  simulateWebMonetization
};

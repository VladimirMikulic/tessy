const Store = require('./store');
const { isEmptyObject } = require('./utils');

function getPaymentPointer() {
  try {
    const document = Store.getItem('monPageDocument');
    const meta = document.querySelector('meta[name="monetization"]');
    const paymentPointer = meta.getAttribute('content');

    return paymentPointer;
  } catch (error) {
    throw new Error(
      'Please specify payment pointer in meta tag or pass it as an option.'
    );
  }
}

function setPaymentPointer(pointer) {
  const document = Store.getItem('monPageDocument');
  const meta = document.createElement('meta');

  meta.setAttribute('name', 'monetization');
  meta.setAttribute('content', pointer);

  document.head.appendChild(meta);
}

let pluginOptions = {};
const defaultPluginOptions = {
  amount: '10000',
  assetCode: 'USD',
  assetScale: 9,
  get paymentPointer() {
    return getPaymentPointer();
  }
};

function initPluginOptions(options = {}) {
  if (options.paymentPointer) {
    setPaymentPointer(options.paymentPointer);
  }

  pluginOptions = {
    ...defaultPluginOptions,
    ...options
  };

  return pluginOptions;
}

const getPluginOptions = () => {
  const optionsSpecified = !isEmptyObject(pluginOptions);

  if (optionsSpecified) return pluginOptions;
  return defaultPluginOptions;
};

module.exports = {
  initPluginOptions,
  getPluginOptions
};

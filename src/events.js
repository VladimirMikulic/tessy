const Store = require('./store');
const { getPluginOptions } = require('./options');

function createEvent(eventType) {
  const requestId = 'c7ff7da9-8a41-4660-98a8-ca4df0176fbe';
  const { paymentPointer } = getPluginOptions();
  const eventDetails = { requestId, paymentPointer };

  if (eventType === 'monetizationprogress') {
    const { amount, assetCode, assetScale } = getPluginOptions();

    Object.assign(eventDetails, {
      amount,
      assetCode,
      assetScale
    });
  }

  return new CustomEvent(eventType, { detail: eventDetails });
}

function emit(eventType) {
  const event = createEvent(eventType);
  const document = Store.getItem('monPageDocument');

  document.monetization.dispatchEvent(event);

  if (eventType === 'monetizationstart') {
    document.monetization.state = 'started';
  }

  return event;
}

module.exports = { emit };

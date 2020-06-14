exports.isEmptyObject = obj => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
};

exports.isFunction = obj => typeof obj === 'function';

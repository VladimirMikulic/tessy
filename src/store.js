const store = {};

module.exports = {
  setItem(key, value) {
    store[key] = value;
    return store[key];
  },
  getItem(key) {
    return store[key];
  }
};

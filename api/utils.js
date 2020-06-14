const fs = require('fs');
const path = require('path');

exports.getMonetizationScript = () => {
  const monetizationScriptPath = path.resolve(
    __dirname,
    '../scripts/monetization-browser.js'
  );
  const monetizationScript = fs.readFileSync(monetizationScriptPath).toString();

  return monetizationScript;
};

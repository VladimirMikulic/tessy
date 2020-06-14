const path = require('path');
const { exec, execSync } = require('child_process');

exports.startServer = () => {
  exec(`node_modules/.bin/http-server ${__dirname}`, { shell: true });
};

exports.closeServer = () => {
  const serverPID = execSync('lsof -t -i:8080').toString();
  execSync(`kill -9 ${serverPID}`);
};

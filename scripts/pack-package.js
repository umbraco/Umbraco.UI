const { execSync } = require('child_process');

const packageName = process.argv[2];
console.log('Build and pack: ' + packageName);

execSync(
  'lerna run --scope @umbraco-ui/' +
    packageName +
    ' build && cd packages/' +
    packageName +
    ' && npm pack'
);

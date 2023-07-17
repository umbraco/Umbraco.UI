const { execSync } = require('child_process');

const packageName = process.argv[2];
console.log('Test coverage for package: ' + packageName);

execSync(
  `web-test-runner "packages/${packageName}/**/*.test.ts" --node-resolve --coverage`,
  { stdio: 'inherit' },
);

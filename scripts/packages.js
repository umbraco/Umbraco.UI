const path = require('path');
const { getDirectories } = require('./utils');

const packageNamespace = '@umbraco-ui';
const packagesDirectoryName = 'packages';
const packagesRoot = path.join(__dirname, '..', packagesDirectoryName);
const packageDirectoryNames = getDirectories(packagesDirectoryName);

exports.packageNamespace = packageNamespace;
exports.packagesDirectoryName = packagesDirectoryName;
exports.packagesRoot = packagesRoot;
exports.packageDirectoryNames = packageDirectoryNames;

#!/usr/bin/env node
const fs = require('fs');

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const readJSONFile = (path) => {
  const content = fs.readFileSync(path);
  return JSON.parse(content);
}

exports.getDirectories = getDirectories;
exports.readJSONFile = readJSONFile;
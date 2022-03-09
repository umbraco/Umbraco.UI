#!/usr/bin/env node
const fs = require('fs');

const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

exports.getDirectories = getDirectories;

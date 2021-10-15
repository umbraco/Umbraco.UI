import fs from 'fs';
import path from 'path';

//THIS IS A WORK IN PROGRESS

const args = process.argv;

if (args.length <= 2) {
  console.error(`
  This script needs minimum two arguments.
  1: action type 'add' | 'remove' | 'modify'
  2: key
  3: value

  example node modify-pkgjson.mjs add homepage https://github.com

  `);
  throw new Error('not enough args');
}

args.splice(0, 2);

const PKG_NAME = path.basename(path.resolve(process.cwd()));

const action = args[0]; //add, remove, modify
const key = args[1].replace(/PKG_NAME/g, PKG_NAME);
const value = args[2].replace(/PKG_NAME/g, PKG_NAME);

function main() {
  const folder = fs.realpathSync('.');
  const pkg = readPackageJson(folder);

  console.log(key, value);
  if (action === 'add') {
    const fpath = path.join(folder, 'package.json');
    console.debug(`Adding "${key}":"${value}" to ${fpath}...`);
    pkg[`${key}`] = `${value}`;
    fs.writeFileSync(fpath, JSON.stringify(pkg, null, 2) + '\n');
    return;
  }

  if (action === 'remove') {
    const fpath = path.join(folder, 'package.json');
    console.log(!(key in pkg));
    if (!(key in pkg)) {
      throw new Error(`There is no ${key} in ${fpath}`);
    } else {
      console.debug(`Deleting "${key}" from ${fpath}...`);
      delete pkg[`${key}`];
      fs.writeFileSync(fpath, JSON.stringify(pkg, null, 2) + '\n');
      return;
    }
  }
}

function readJsonFile(fpath) {
  const content = fs.readFileSync(fpath);
  return JSON.parse(content);
}

function readPackageJson(folder) {
  const packageJsonPath = path.join(folder, 'package.json');
  return readJsonFile(packageJsonPath);
}

try {
  main();
} catch (err) {
  console.error(err);
}

import fs from 'fs';
import path from 'path';

const args = process.argv;
args.splice(0, 2);

const action = args[0]; //add, remove, modify
const key = args[1];
const value = args[2];

function main() {
  const folder = fs.realpathSync('.');
  const pkg = readPackageJson(folder);

  if (action === 'add') {
    const fpath = path.join(folder, 'package.json');
    console.debug(`Adding "${key}":"${value}" to ${fpath}...`);
    pkg[`${key}`] = `${value}`;
    console.log(pkg);
    //fs.writeFileSync(fpath, JSON.stringify(pkg, null, 2) + '\n');
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

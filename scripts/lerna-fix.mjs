import fs from 'fs';
import path from 'path';


function main() {
    const folder = fs.realpathSync('.');
    const pkg = readPackageJson(folder);
    if (pkg.gitHead) {
      const fpath = path.join(folder, 'package.json');
      console.debug(`Deleting gitHead from ${fpath}...`);
      delete pkg.gitHead;
      fs.writeFileSync(fpath, JSON.stringify(pkg, null, 2) + '\n');
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
  
  main();
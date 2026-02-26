import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const Runner = require('jscodeshift/src/Runner');

const __dirname = dirname(fileURLToPath(import.meta.url));
const transformsDir = resolve(__dirname, '..', 'transforms');

/**
 * Run a named transform against the given file paths.
 *
 * @param {string} transformName - e.g. "v2.0.0/update-imports"
 * @param {string[]} paths - files or directories to transform
 * @param {{ write?: boolean }} options
 */
export async function runTransform(transformName, paths, options = {}) {
  const transformPath = resolve(transformsDir, `${transformName}.ts`);

  return Runner.run(transformPath, paths, {
    dry: !options.write,
    print: false,
    verbose: 0,
    silent: false,
    parser: 'tsx',
    extensions: 'ts,tsx,js,jsx,mjs,mts',
  });
}

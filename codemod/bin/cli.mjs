#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTransform } from '../lib/runner.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const migrations = JSON.parse(
  readFileSync(resolve(__dirname, '..', 'migrations.json'), 'utf-8'),
);

// --- Helpers ---

function parseVersion(v) {
  return v.split('.').map(Number);
}

function versionLte(a, b) {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  for (let i = 0; i < 3; i++) {
    if (pa[i] < pb[i]) return true;
    if (pa[i] > pb[i]) return false;
  }
  return true;
}

function versionGt(a, b) {
  return !versionLte(a, b);
}

function printHelp() {
  console.log(`
Usage:
  uui-codemod [options] [path]
  uui-codemod <transform> <path>

Options:
  --target <version>  Run all codemods up to this version
  --from <version>    Starting version (skip already-applied codemods)
  --write             Apply changes (default: dry-run)
  --list              List available codemods
  --help              Show this help

Examples:
  # List available codemods
  uui-codemod --list

  # Dry-run all v2 codemods
  uui-codemod --target 2.0.0 ./src

  # Apply changes
  uui-codemod --target 2.0.0 --write ./src

  # Run a specific codemod
  uui-codemod v2.0.0/update-imports ./src
`.trim());
}

function printMigrations() {
  console.log('Available codemods:\n');
  for (const m of migrations.migrations) {
    console.log(`  v${m.version} — ${m.title}`);
    for (const t of m.transforms) {
      console.log(`    - ${t}`);
    }
  }
  console.log('');
}

// --- Parse args ---

let parsed;
try {
  parsed = parseArgs({
    options: {
      target: { type: 'string' },
      from: { type: 'string' },
      write: { type: 'boolean', default: false },
      list: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
    },
    allowPositionals: true,
  });
} catch (e) {
  console.error(e.message);
  printHelp();
  process.exit(1);
}

const { values, positionals } = parsed;

if (values.help) {
  printHelp();
  process.exit(0);
}

if (values.list) {
  printMigrations();
  process.exit(0);
}

// --- Run specific transform ---

if (!values.target && positionals.length >= 2) {
  const [transform, ...paths] = positionals;

  console.log(`Running: ${transform}`);
  if (!values.write) {
    console.log('(dry run — use --write to apply changes)\n');
  }

  try {
    const result = await runTransform(transform, paths, { write: values.write });
    printResult(result);
  } catch (e) {
    console.error(`Error running transform: ${e.message}`);
    process.exit(1);
  }
  process.exit(0);
}

// --- Run by target version ---

if (!values.target) {
  console.error('Error: --target <version> or <transform> <path> required.\n');
  printHelp();
  process.exit(1);
}

if (positionals.length === 0) {
  console.error('Error: path argument required.\n');
  printHelp();
  process.exit(1);
}

const target = values.target;
const from = values.from || '0.0.0';

const applicable = migrations.migrations.filter(
  m => versionLte(m.version, target) && versionGt(m.version, from),
);

if (applicable.length === 0) {
  console.log(`No codemods to run for target ${target} (from ${from}).`);
  process.exit(0);
}

if (!values.write) {
  console.log('(dry run — use --write to apply changes)\n');
}

for (const migration of applicable) {
  console.log(`\n--- v${migration.version}: ${migration.title} ---\n`);

  for (const transform of migration.transforms) {
    console.log(`Running: ${transform}`);
    try {
      const result = await runTransform(transform, positionals, {
        write: values.write,
      });
      printResult(result);
    } catch (e) {
      console.error(`Error running ${transform}: ${e.message}`);
      process.exit(1);
    }
  }
}

function printResult(result) {
  if (!result) return;
  const { ok = 0, nochange = 0, skip = 0, error = 0 } = result.stats || result;
  console.log(`  Changed: ${ok}  Unchanged: ${nochange}  Skipped: ${skip}  Errors: ${error}`);
}

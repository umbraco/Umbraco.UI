import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

// Lerna-Lite writes the new release into CHANGELOG.md twice when the only
// package is the repository root: once as the package changelog and once as
// the root changelog. This runs as the `postversion` script (after Lerna-Lite
// has committed and tagged, and before anything is pushed), removes the
// second copy, and folds the fix into the release commit and tag.

const changelogPath = 'CHANGELOG.md';
const changelog = readFileSync(changelogPath, 'utf8');

const sectionStarts = [...changelog.matchAll(/^#{1,2} \[.+$/gm)].map(
  match => match.index,
);

if (sectionStarts.length < 2) process.exit(0);

const [first, second, third = changelog.length] = sectionStarts;
const firstSection = changelog.slice(first, second);
const secondSection = changelog.slice(second, third);

if (firstSection.trim() !== secondSection.trim()) process.exit(0);

writeFileSync(
  changelogPath,
  changelog.slice(0, second) + changelog.slice(third),
);
console.log(`Removed the duplicated release section from ${changelogPath}.`);

const version = process.env.npm_package_version;
if (!version) process.exit(0);

const tag = `v${version}`;
const git = (...args) => execFileSync('git', args, { stdio: 'inherit' });

const tagExists =
  execFileSync('git', ['tag', '--list', tag], { encoding: 'utf8' }).trim() ===
  tag;
if (!tagExists) process.exit(0);

git('add', changelogPath);
git('commit', '--amend', '--no-edit');
git('tag', '--force', '--annotate', tag, '--message', tag);

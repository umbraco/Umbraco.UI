import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

// Lerna-Lite writes the new release into CHANGELOG.md twice when the only
// package is the repository root: once as the package changelog and once as
// the root changelog. This runs as the `postversion` script (after Lerna-Lite
// has committed and tagged, and before anything is pushed), removes the
// second copy, and folds the fix into the release commit and tag.
// The copies are not always identical: the package changelog only lists
// commits that touch files, so it misses empty commits that the root
// changelog (the first section) includes. Same heading means same release.

const changelogPath = 'CHANGELOG.md';
const changelog = readFileSync(changelogPath, 'utf8');

const sectionStarts = [...changelog.matchAll(/^#{1,2} \[.+$/gm)].map(
  match => match.index,
);

if (sectionStarts.length < 2) process.exit(0);

const [first, second, third = changelog.length] = sectionStarts;
const headingOf = start =>
  changelog.slice(start, changelog.indexOf('\n', start));

if (headingOf(first) !== headingOf(second)) process.exit(0);

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

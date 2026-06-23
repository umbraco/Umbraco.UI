import { execSync } from 'node:child_process';

const packageName = process.argv[2];

// Validate against the component folder naming convention before passing it
// to the shell, so untrusted CLI input can't inject OS commands.
if (!packageName || !/^[a-z0-9][a-z0-9-]*$/.test(packageName)) {
  console.error(
    `Invalid package name: "${packageName}". Expected a component folder name (lowercase letters, digits and hyphens).`,
  );
  process.exit(1);
}

console.log('Test coverage for package: ' + packageName);

execSync(`vitest run "src/components/${packageName}" --coverage`, {
  stdio: 'inherit',
});

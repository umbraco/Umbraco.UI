# Testing UUI locally with npm link

This guide explains how to test a local build of `@umbraco-ui/uui` in a consuming project (e.g. the Umbraco backoffice) using `npm link`.

## How npm link works

`npm link` creates a global symlink from your local package, then lets another project resolve that package name to your local build instead of the npm registry version.

It's a two-step process:

1. **Register** — in the library repo, run `npm link` to create a global symlink pointing at this directory.
2. **Consume** — in the consuming project, run `npm link <package-name>` to replace the installed version with the symlink.

## Step-by-step: UUI in the Umbraco backoffice

### Prerequisites

- Both repos checked out locally:
  - `Umbraco.UI` (this repo)
  - `Umbraco-CMS` (the backoffice lives at `src/Umbraco.Web.UI.Client/`)
- Node >= 24.13 and npm >= 11 installed

### 1. Build UUI

```bash
cd ~/Projects/Umbraco.UI
npm run clean && npm run build
```

This produces the `dist/` directory that consumers will resolve, including `.d.ts` type declarations and the custom elements manifest. For iterating, `build:watch` is faster (see step 6).

### 2. Register the link

```bash
cd ~/Projects/Umbraco.UI
npm link
```

This creates a global symlink: `{global-node-modules}/@umbraco-ui/uui` -> `~/Projects/Umbraco.UI`.

You only need to do this once (or again after `npm install`, which can remove the link).

### 3. Link into the backoffice

```bash
cd ~/Projects/Umbraco-CMS/src/Umbraco.Web.UI.Client
npm link @umbraco-ui/uui
```

This replaces the installed `node_modules/@umbraco-ui/uui` with a symlink to your local build.

> **Note:** The backoffice uses npm workspaces internally. The UUI dependency lives in the `src/external/uui/` workspace package, so npm may hoist it to the root `node_modules/`. If the link doesn't take effect in a nested workspace, try running `npm link @umbraco-ui/uui` from the `Umbraco.Web.UI.Client` root instead.

### 4. Verify the link

```bash
ls -la node_modules/@umbraco-ui/uui
```

You should see a symlink arrow (`->`) pointing to your local Umbraco.UI directory, not a regular directory.

### 5. Run the backoffice

Start the backoffice dev server as usual. It will now resolve `@umbraco-ui/uui` from your local build.

### 6. Iterate

For live development, use watch mode in one terminal and the backoffice dev server in another:

```bash
# Terminal 1 — UUI (rebuilds dist/ on every source change)
npm run build:watch

# Terminal 2 — Backoffice
npm run dev
```

`build:watch` generates type declarations once (via `tsc`), then enters Vite watch mode which incrementally rebuilds `dist/` on source changes. The symlink means the backoffice Vite dev server sees the updated files and triggers HMR. Subsequent watch rebuilds preserve the `.d.ts` files (`--emptyOutDir false`).

For one-off changes, `npm run build` works too. No need to re-run `npm link` after rebuilding — the symlink is already in place.

### 7. Unlink when done

```bash
# In the backoffice — remove the symlink and restore the registry version
cd ~/Projects/Umbraco-CMS/src/Umbraco.Web.UI.Client
npm unlink @umbraco-ui/uui
npm install
```

## Troubleshooting

### "Could not find a declaration file" / implicit `any` types

`build:watch` runs `tsc` once at startup, so declarations should be present. If they're missing, the initial `tsc` step may have failed — check the terminal output for TypeScript errors. You can also regenerate them manually:

```bash
tsc -p tsconfig.build.json
```

If you change public API signatures (new exports, renamed types, etc.) while watch mode is running, you'll need to restart `build:watch` to regenerate the `.d.ts` files.

### "Module not found" after linking

Bundlers sometimes don't follow symlinks. If Vite doesn't resolve the linked package:

- Check that `resolve.preserveSymlinks` is not set to `true` in the consumer's Vite config (Vite follows symlinks by default).
- Make sure you ran `npm run build` in UUI — the link points to the repo root, but consumers resolve from `dist/` via the `exports` field in `package.json`.

### Link disappears after `npm install`

Running `npm install` in either repo can remove the symlink. Re-run `npm link @umbraco-ui/uui` in the consumer after any `npm install`.

### Duplicate Lit runtime

If you see Lit warnings about duplicate registrations, the consumer and UUI may be resolving separate copies of Lit. Since UUI externalizes Lit (it's not bundled in `dist/`), the consumer's copy should be used. If not:

```bash
# In the backoffice, ensure Lit resolves to one copy
npm ls lit
```

If multiple versions appear, the consumer's bundler config may need a `resolve.dedupe: ['lit']` entry.

## Alternative: `file:` protocol

If `npm link` causes issues (e.g. with the backoffice's workspace hoisting), you can use a `file:` dependency instead:

```jsonc
// In the consumer's package.json
{
  "dependencies": {
    "@umbraco-ui/uui": "file:../../../Umbraco.UI",
  },
}
```

Then run `npm install`. This copies (not symlinks) the package, so you need to re-run `npm install` after each UUI rebuild. It avoids symlink-related issues but is slower to iterate with.

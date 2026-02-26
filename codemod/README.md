# @umbraco-ui/codemod

Automated codemods for migrating between [Umbraco UI](https://github.com/umbraco/Umbraco.UI) versions.

## Usage

```bash
# Run all codemods for a target version (dry-run by default)
npx @umbraco-ui/codemod --target 2.0.0 ./src

# Apply changes
npx @umbraco-ui/codemod --target 2.0.0 --write ./src

# List available codemods
npx @umbraco-ui/codemod --list

# Run a specific codemod
npx @umbraco-ui/codemod v2.0.0/update-imports ./src
```

## Available codemods

### v2.0.0/update-imports

Rewrites `@umbraco-ui/uui-*` imports to the v2 single-package format.

| v1 pattern | v2 pattern |
|---|---|
| `@umbraco-ui/uui-{name}` | `@umbraco-ui/uui/components/{name}/{name}.js` |
| `@umbraco-ui/uui-{name}/lib/{file}` | `@umbraco-ui/uui/components/{name}/{file}.js` |
| `@umbraco-ui/uui-base` / `@umbraco-ui/uui-base/lib/*` | `@umbraco-ui/uui` |
| `@umbraco-ui/uui-css` / `@umbraco-ui/uui-css/lib/*` | `@umbraco-ui/uui` |

Handles:
- `import` and `import type` declarations
- `export { ... } from` and `export * from` re-exports
- Dynamic `import()` calls
- Merges multiple imports that map to the same target
- Warns on removed components (`uui-caret`, `uui-popover`)

## Options

| Flag | Description |
|---|---|
| `--target <version>` | Run all codemods up to this version |
| `--from <version>` | Skip codemods at or below this version |
| `--write` | Apply changes (default: dry-run) |
| `--list` | List all available codemods |
| `--help` | Show help |

## Requirements

- Node.js >= 20

## Adding new codemods

1. Create a transform in `transforms/{version}/{name}.ts`
2. Add test fixtures in `transforms/{version}/__testfixtures__/`
3. Register the transform in `migrations.json`

See the [migration guide](../docs/MIGRATION-V1-TO-V2.md) for full v1 → v2 migration details.

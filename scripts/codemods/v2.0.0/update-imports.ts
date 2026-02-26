import type { API, FileInfo, Options, ASTPath, ImportDeclaration } from 'jscodeshift';

const REMOVED_COMPONENTS: Record<string, string> = {
  'uui-caret': 'uui-symbol-expand',
  'uui-popover': 'uui-popover-container',
};

interface MapResult {
  target: string | null;
  warning?: string;
}

function mapSource(source: string): MapResult {
  // Already v2 barrel or not a uui-* package — skip
  if (source === '@umbraco-ui/uui' || !source.startsWith('@umbraco-ui/uui-')) {
    return { target: null };
  }

  // Match @umbraco-ui/uui-{name} with optional /lib/{file} (strip trailing .js)
  const match = source.match(
    /^@umbraco-ui\/uui-([^/]+?)(?:\/lib\/(.+?)(?:\.js)?)?$/,
  );
  if (!match) return { target: null };

  const [, name, libFile] = match;

  // Removed components
  const fullName = `uui-${name}`;
  if (fullName in REMOVED_COMPONENTS) {
    return {
      target: null,
      warning: `${fullName} was removed in v2. Use ${REMOVED_COMPONENTS[fullName]} instead.`,
    };
  }

  // Foundation (uui-base) → barrel
  if (name === 'base') {
    return { target: '@umbraco-ui/uui' };
  }

  // CSS (uui-css) → barrel
  if (name === 'css') {
    return { target: '@umbraco-ui/uui' };
  }

  // Deep import: @umbraco-ui/uui-{name}/lib/{file}
  if (libFile) {
    // Strip uui- prefix from filename if present
    const stripped = libFile.startsWith('uui-') ? libFile.slice(4) : libFile;
    return { target: `@umbraco-ui/uui/components/${name}/${stripped}.js` };
  }

  // Bare component import
  return { target: `@umbraco-ui/uui/components/${name}/${name}.js` };
}

export default function transform(
  fileInfo: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const warnings: string[] = [];

  // --- Import declarations (including `import type`) ---

  // Group imports by target + kind for merging
  const mergeGroups = new Map<
    string,
    {
      first: ASTPath<ImportDeclaration>;
      specifiers: ImportDeclaration['specifiers'];
      rest: ASTPath<ImportDeclaration>[];
    }
  >();

  root.find(j.ImportDeclaration).forEach(path => {
    const source = path.node.source.value;
    if (typeof source !== 'string') return;

    const result = mapSource(source);
    if (result.warning) warnings.push(result.warning);
    if (!result.target) return;

    const isType = path.node.importKind === 'type';
    const key = `${result.target}::${isType ? 'type' : 'value'}`;

    if (mergeGroups.has(key)) {
      const group = mergeGroups.get(key)!;
      if (path.node.specifiers && path.node.specifiers.length > 0) {
        group.specifiers = [
          ...(group.specifiers || []),
          ...path.node.specifiers,
        ];
      }
      group.rest.push(path);
    } else {
      mergeGroups.set(key, {
        first: path,
        specifiers: path.node.specifiers ? [...path.node.specifiers] : [],
        rest: [],
      });
    }
  });

  // Apply merges
  for (const [key, group] of mergeGroups) {
    const target = key.split('::')[0];

    // Update source on the first import (mutate to preserve quote style)
    group.first.node.source.value = target;

    // Merge and deduplicate specifiers
    if (group.specifiers && group.specifiers.length > 0) {
      const seen = new Set<string>();
      const unique = group.specifiers.filter(s => {
        if (!s) return false;
        const name =
          s.type === 'ImportDefaultSpecifier'
            ? 'default'
            : s.type === 'ImportNamespaceSpecifier'
              ? '*'
              : (s as any).imported?.name || (s as any).local?.name;
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      });
      group.first.node.specifiers = unique;
    }

    // Remove duplicate imports
    for (const rest of group.rest) {
      j(rest).remove();
    }
  }

  // --- Export declarations with source ---

  root
    .find(j.ExportNamedDeclaration)
    .filter(path => path.node.source != null)
    .forEach(path => {
      const source = path.node.source!.value;
      if (typeof source !== 'string') return;

      const result = mapSource(source);
      if (result.warning) warnings.push(result.warning);
      if (result.target) {
        path.node.source!.value = result.target;
      }
    });

  root.find(j.ExportAllDeclaration).forEach(path => {
    const source = path.node.source.value;
    if (typeof source !== 'string') return;

    const result = mapSource(source);
    if (result.warning) warnings.push(result.warning);
    if (result.target) {
      path.node.source.value = result.target;
    }
  });

  // --- Dynamic imports: import('...') ---
  // tsx parser: CallExpression with callee.type === 'Import'

  root
    .find(j.CallExpression, { callee: { type: 'Import' } })
    .forEach(path => {
      const arg = path.node.arguments[0];
      if (!arg) return;

      const source =
        arg.type === 'StringLiteral'
          ? arg.value
          : arg.type === 'Literal' && typeof arg.value === 'string'
            ? arg.value
            : null;

      if (!source) return;

      const result = mapSource(source);
      if (result.warning) warnings.push(result.warning);
      if (result.target) {
        (arg as any).value = result.target;
      }
    });

  // --- Path-based references (string literals in configs, template literals in HTML) ---
  // Handles e.g. vite-plugin-static-copy targets and <link> tags in Lit templates.

  const PATH_REPLACEMENTS: [RegExp, string][] = [
    [/@umbraco-ui\/uui-css\/dist\/uui-css\.css/g, '@umbraco-ui/uui/dist/themes/light.css'],
    [/@umbraco-ui\/uui-css\/assets\/fonts/g, '@umbraco-ui/uui/dist/assets/fonts'],
  ];

  function rewritePaths(value: string): string | null {
    let result = value;
    let changed = false;
    for (const [pattern, replacement] of PATH_REPLACEMENTS) {
      // Reset lastIndex for global regexps
      pattern.lastIndex = 0;
      const next = result.replace(pattern, replacement);
      if (next !== result) {
        changed = true;
        result = next;
      }
    }
    return changed ? result : null;
  }

  // String literals (e.g. vite config paths)
  root.find(j.StringLiteral).forEach(path => {
    const rewritten = rewritePaths(path.node.value);
    if (rewritten !== null) {
      path.node.value = rewritten;
    }
  });

  // Template literal quasis (e.g. html`<link href="...">`)
  root.find(j.TemplateLiteral).forEach(path => {
    for (const quasi of path.node.quasis) {
      const rawRewritten = rewritePaths(quasi.value.raw);
      if (rawRewritten !== null) {
        quasi.value.raw = rawRewritten;
        // Keep cooked in sync
        const cookedRewritten = rewritePaths(quasi.value.cooked || '');
        if (cookedRewritten !== null) {
          quasi.value.cooked = cookedRewritten;
        }
      }
    }
  });

  // Print warnings to stderr
  for (const warning of warnings) {
    console.warn(`\u26a0\ufe0f  ${fileInfo.path}: ${warning}`);
  }

  return root.toSource({ quote: 'single' });
}

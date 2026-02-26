import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import jscodeshift from 'jscodeshift';

const __dirname = dirname(fileURLToPath(import.meta.url));
const transformsDir = resolve(__dirname, '..', 'transforms');

// Use tsx parser so import type / TypeScript syntax is supported
const j = jscodeshift.withParser('tsx');

function applyTransform(transformModule, input, path = 'test.ts') {
  return transformModule.default(
    { source: input, path },
    { jscodeshift: j, j: j, stats: () => {}, report: () => {} },
    {},
  );
}

function readFixture(version, name, type) {
  return readFileSync(
    resolve(transformsDir, version, '__testfixtures__', `${name}.${type}.ts`),
    'utf-8',
  );
}

describe('v2.0.0/update-imports', () => {
  let transform;

  // Import the transform once before all tests
  it('loads the transform module', async () => {
    transform = await import(
      resolve(transformsDir, 'v2.0.0', 'update-imports.ts')
    );
    expect(transform.default).toBeTypeOf('function');
  });

  it('transforms fixture correctly', () => {
    const input = readFixture('v2.0.0', 'update-imports', 'input');
    const expected = readFixture('v2.0.0', 'update-imports', 'output');

    const output = applyTransform(transform, input);
    expect(output.trim()).toBe(expected.trim());
  });

  it('rewrites bare component import', () => {
    const input = `import '@umbraco-ui/uui-button';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(`'@umbraco-ui/uui/components/button/button.js'`);
  });

  it('rewrites deep component import and strips uui- prefix', () => {
    const input = `import { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(
      `'@umbraco-ui/uui/components/button/button.element.js'`,
    );
  });

  it('rewrites import type', () => {
    const input = `import type { UUIInputElement } from '@umbraco-ui/uui-input/lib/uui-input.element';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(
      `'@umbraco-ui/uui/components/input/input.element.js'`,
    );
  });

  it('maps uui-base to barrel import', () => {
    const input = `import { defineElement } from '@umbraco-ui/uui-base/lib/registration';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(`from '@umbraco-ui/uui'`);
  });

  it('maps uui-css to barrel import', () => {
    const input = `import { UUITextStyles } from '@umbraco-ui/uui-css/lib/uui-text.styles';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(`from '@umbraco-ui/uui'`);
  });

  it('merges multiple barrel-bound imports', () => {
    const input = [
      `import { defineElement } from '@umbraco-ui/uui-base/lib/registration';`,
      `import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';`,
    ].join('\n');
    const output = applyTransform(transform, input);

    // Should be a single import with both specifiers
    expect(output).toContain('defineElement');
    expect(output).toContain('LabelMixin');
    // Only one @umbraco-ui/uui import
    const matches = output.match(/@umbraco-ui\/uui'/g);
    expect(matches).toHaveLength(1);
  });

  it('handles export re-exports', () => {
    const input = `export { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(
      `'@umbraco-ui/uui/components/button/button.element.js'`,
    );
  });

  it('handles export * from', () => {
    const input = `export * from '@umbraco-ui/uui-badge';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(
      `'@umbraco-ui/uui/components/badge/badge.js'`,
    );
  });

  it('handles dynamic import()', () => {
    const input = `const m = import('@umbraco-ui/uui-dialog');`;
    const output = applyTransform(transform, input);
    expect(output).toContain(
      `'@umbraco-ui/uui/components/dialog/dialog.js'`,
    );
  });

  it('leaves existing @umbraco-ui/uui barrel import alone', () => {
    const input = `import '@umbraco-ui/uui';`;
    const output = applyTransform(transform, input);
    expect(output).toBe(input);
  });

  it('leaves non-UUI imports alone', () => {
    const input = `import { html } from 'lit';`;
    const output = applyTransform(transform, input);
    expect(output).toBe(input);
  });

  it('handles multi-part component names', () => {
    const input = `import '@umbraco-ui/uui-button-group';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(
      `'@umbraco-ui/uui/components/button-group/button-group.js'`,
    );
  });

  it('strips .js extension from v1 deep imports', () => {
    const input = `import { UUICardElement } from '@umbraco-ui/uui-card/lib/uui-card.element.js';`;
    const output = applyTransform(transform, input);
    expect(output).toContain(
      `'@umbraco-ui/uui/components/card/card.element.js'`,
    );
  });

  it('does not transform removed components but warns', () => {
    const input = `import '@umbraco-ui/uui-caret';`;
    const output = applyTransform(transform, input);
    // Import should remain unchanged (no valid target)
    expect(output).toContain(`'@umbraco-ui/uui-caret'`);
  });
});

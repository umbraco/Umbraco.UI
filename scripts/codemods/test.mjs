/**
 * Tests for codemod transforms.
 * Run: node --test scripts/codemods/test.mjs
 * Requires: jscodeshift (npm install --save-dev jscodeshift)
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import jscodeshift from 'jscodeshift';

const __dirname = dirname(fileURLToPath(import.meta.url));
const j = jscodeshift.withParser('tsx');

function applyTransform(mod, input) {
  return mod.default(
    { source: input, path: 'test.ts' },
    { jscodeshift: j, j, stats: () => {}, report: () => {} },
    {},
  );
}

describe('v2.0.0/update-imports', async () => {
  const transform = await import(
    resolve(__dirname, 'v2.0.0', 'update-imports.ts')
  );

  it('transforms fixture correctly', () => {
    const input = readFileSync(
      resolve(__dirname, 'v2.0.0', '__testfixtures__', 'update-imports.input.ts'),
      'utf-8',
    );
    const expected = readFileSync(
      resolve(__dirname, 'v2.0.0', '__testfixtures__', 'update-imports.output.ts'),
      'utf-8',
    );
    assert.equal(applyTransform(transform, input).trim(), expected.trim());
  });

  it('rewrites bare component import', () => {
    const out = applyTransform(transform, `import '@umbraco-ui/uui-button';`);
    assert.ok(out.includes(`'@umbraco-ui/uui/components/button/button.js'`));
  });

  it('rewrites deep import and strips uui- prefix', () => {
    const out = applyTransform(
      transform,
      `import { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';`,
    );
    assert.ok(out.includes(`'@umbraco-ui/uui/components/button/button.element.js'`));
  });

  it('maps uui-base to barrel', () => {
    const out = applyTransform(
      transform,
      `import { defineElement } from '@umbraco-ui/uui-base/lib/registration';`,
    );
    assert.ok(out.includes(`from '@umbraco-ui/uui'`));
  });

  it('merges multiple barrel-bound imports', () => {
    const out = applyTransform(
      transform,
      [
        `import { defineElement } from '@umbraco-ui/uui-base/lib/registration';`,
        `import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';`,
      ].join('\n'),
    );
    assert.ok(out.includes('defineElement'));
    assert.ok(out.includes('LabelMixin'));
    assert.equal(out.match(/@umbraco-ui\/uui'/g)?.length, 1);
  });

  it('handles dynamic import()', () => {
    const out = applyTransform(
      transform,
      `const m = import('@umbraco-ui/uui-dialog');`,
    );
    assert.ok(out.includes(`'@umbraco-ui/uui/components/dialog/dialog.js'`));
  });

  it('leaves barrel import alone', () => {
    const input = `import '@umbraco-ui/uui';`;
    assert.equal(applyTransform(transform, input), input);
  });

  it('leaves non-UUI imports alone', () => {
    const input = `import { html } from 'lit';`;
    assert.equal(applyTransform(transform, input), input);
  });

  it('does not transform removed components', () => {
    const out = applyTransform(transform, `import '@umbraco-ui/uui-caret';`);
    assert.ok(out.includes(`'@umbraco-ui/uui-caret'`));
  });

  it('rewrites uui-css dist path in string literal', () => {
    const out = applyTransform(
      transform,
      `const p = 'node_modules/@umbraco-ui/uui-css/dist/uui-css.css';`,
    );
    assert.ok(out.includes('@umbraco-ui/uui/dist/themes/light.css'));
  });

  it('rewrites uui-css font path in string literal', () => {
    const out = applyTransform(
      transform,
      `const p = 'node_modules/@umbraco-ui/uui-css/assets/fonts/*';`,
    );
    assert.ok(out.includes('@umbraco-ui/uui/dist/assets/fonts/*'));
  });

  it('rewrites paths inside template literals', () => {
    const input = 'const t = html`<link href="node_modules/@umbraco-ui/uui-css/dist/uui-css.css">`;';
    const out = applyTransform(transform, input);
    assert.ok(out.includes('@umbraco-ui/uui/dist/themes/light.css'));
  });
});

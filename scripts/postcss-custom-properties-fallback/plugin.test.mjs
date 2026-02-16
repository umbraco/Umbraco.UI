import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import postcss from 'postcss';
import plugin from './plugin.mjs';

const customProperties = {
  customProperties: {
    '--uui-color-text': '#1b264f',
    '--uui-size-4': '12px',
    '--uui-font-family': 'Lato, Helvetica, Arial, sans-serif',
  },
};

async function run(input) {
  const result = await postcss([
    plugin({ importFrom: [customProperties] }),
  ]).process(input, { from: undefined });
  return result.css;
}

describe('postcss-custom-properties-fallback', () => {
  it('injects a fallback for a var() without one', async () => {
    const output = await run('a { color: var(--uui-color-text); }');
    assert.equal(output, 'a { color: var(--uui-color-text, #1b264f); }');
  });

  it('does not modify a var() that already has a fallback', async () => {
    const output = await run('a { color: var(--uui-color-text, red); }');
    assert.equal(output, 'a { color: var(--uui-color-text, red); }');
  });

  it('handles multiple var() calls in one declaration', async () => {
    const output = await run(
      'a { border: var(--uui-size-4) solid var(--uui-color-text); }',
    );
    assert.equal(
      output,
      'a { border: var(--uui-size-4, 12px) solid var(--uui-color-text, #1b264f); }',
    );
  });

  it('leaves unknown custom properties unchanged', async () => {
    const output = await run('a { color: var(--unknown-prop); }');
    assert.equal(output, 'a { color: var(--unknown-prop); }');
  });

  it('handles multi-word fallback values', async () => {
    const output = await run('a { font-family: var(--uui-font-family); }');
    assert.equal(
      output,
      'a { font-family: var(--uui-font-family, Lato, Helvetica, Arial, sans-serif); }',
    );
  });

  it('does not touch declarations without var()', async () => {
    const output = await run('a { color: red; }');
    assert.equal(output, 'a { color: red; }');
  });
});

/**
 * Smoke test: verifies that custom element registration works correctly.
 *
 * - Importing a .element.js file must NOT register the component.
 * - Importing the barrel (index.js) must register all components.
 *
 * Each vitest browser test file runs in its own page context, so the custom
 * element registry starts clean.
 */

const sampleTags = [
  'uui-button',
  'uui-input',
  'uui-icon',
  'uui-table',
  'uui-badge',
  'uui-dialog',
  'uui-toggle',
  'uui-tag',
];

describe('Component registration', () => {
  it('element-only import does NOT register the custom element', async () => {
    await import('./button/button.element.js');
    expect(customElements.get('uui-button')).toBeUndefined();
  });

  it('barrel import registers components', async () => {
    await import('./index.js');

    for (const tag of sampleTags) {
      expect(customElements.get(tag)).toBeDefined();
    }
  });
});

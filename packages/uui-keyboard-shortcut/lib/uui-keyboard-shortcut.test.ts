import { html, fixture, expect } from '@open-wc/testing';
import { UUIKeyboardShortcutElement } from './uui-keyboard-shortcut.element';
import '.';

describe('UUIKey', () => {
  let element: UUIKeyboardShortcutElement;
  beforeEach(async () => {
    element = await fixture(html`<uui-key>z</uui-key> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIKeyboardShortcut', () => {
  let element: UUIKeyboardShortcutElement;
  beforeEach(async () => {
    element = await fixture(html`
      <uui-keyboard-shortcut>
        <uui-key>ALT</uui-key>
        +
        <uui-key>shift</uui-key>
        +
        <uui-key>&#8593;</uui-key>
        +
        <uui-key>z</uui-key></uui-keyboard-shortcut
      >
    `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

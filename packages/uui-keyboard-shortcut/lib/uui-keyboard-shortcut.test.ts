import { html, fixture, expect } from '@open-wc/testing';
import { UUIKeyboardShortcutElement } from './uui-keyboard-shortcut.element';
import { UUIKeyElement } from './uui-key.element';
import '.';

describe('UUIKey', () => {
  let element: UUIKeyElement;
  beforeEach(async () => {
    element = await fixture(html`<uui-key>ESC</uui-key> `);
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIKeyElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('lowercase text content of element', async () => {
    expect(element.innerText).to.equal('esc');
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

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIKeyboardShortcutElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

import { UUIKeyboardShortcutElement } from './keyboard-shortcut.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIKeyElement } from './key.element';
import './keyboard-shortcut.js';

describe('UUIKey', () => {
  let element: UUIKeyElement;
  beforeEach(async () => {
    element = render(html`<uui-key>ESC</uui-key> `).container.querySelector('uui-key')!;

    await element.updateComplete;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIKeyElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('lowercase text content of element', async () => {
    expect(element.innerText).toBe('esc');
  });
});

describe('UUIKeyboardShortcut', () => {
  let element: UUIKeyboardShortcutElement;
  beforeEach(async () => {
    element = render(html`
      <uui-keyboard-shortcut>
        <uui-key>ALT</uui-key>
        +
        <uui-key>shift</uui-key>
        +
        <uui-key>&#8593;</uui-key>
        +
        <uui-key>z</uui-key></uui-keyboard-shortcut
      >
    `).container.querySelector('uui-keyboard-shortcut')!;

    await element.updateComplete;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIKeyboardShortcutElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});

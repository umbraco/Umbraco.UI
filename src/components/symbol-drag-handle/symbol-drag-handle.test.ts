import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';

import { UUISymbolDragHandleElement } from './symbol-drag-handle.js';

describe('UUIDragHandleElement', () => {
  let element: UUISymbolDragHandleElement;

  beforeEach(async () => {
    element = render(html`
      <uui-symbol-drag-handle></uui-symbol-drag-handle>
    `).container.querySelector('uui-symbol-drag-handle')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUISymbolDragHandleElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('hides the icon from assistive technology when no label is set', async () => {
    const icon = element.shadowRoot!.querySelector('uui-icon')!;
    await icon.updateComplete;
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.hasAttribute('aria-label')).toBe(false);
  });
});

describe('UUIDragHandleElement with label', () => {
  let element: UUISymbolDragHandleElement;

  beforeEach(async () => {
    element = render(html`
      <uui-symbol-drag-handle label="Reorder item"></uui-symbol-drag-handle>
    `).container.querySelector('uui-symbol-drag-handle')!;

    await element.updateComplete;
  });

  it('exposes the label as the accessible name of the icon', async () => {
    const icon = element.shadowRoot!.querySelector('uui-icon')!;
    await icon.updateComplete;
    expect(icon.getAttribute('role')).toBe('img');
    expect(icon.getAttribute('aria-label')).toBe('Reorder item');
    expect(icon.hasAttribute('aria-hidden')).toBe(false);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});

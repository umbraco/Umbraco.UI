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
});

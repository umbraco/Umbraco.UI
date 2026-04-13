import { UUISymbolExpandElement } from './symbol-expand.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './symbol-expand.js';

describe('UUISymbolExpandElement', () => {
  let element: UUISymbolExpandElement;

  beforeEach(async () => {
    element = render(html` <uui-symbol-expand></uui-symbol-expand> `).container.querySelector('uui-symbol-expand')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});

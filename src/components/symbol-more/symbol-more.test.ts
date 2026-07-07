import { UUISymbolMoreElement } from './symbol-more.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './symbol-more.js';

describe('UUISymbolMoreElement', () => {
  let element: UUISymbolMoreElement;

  beforeEach(async () => {
    element = render(html` <uui-symbol-more></uui-symbol-more> `).container.querySelector('uui-symbol-more')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});

import { UUISymbolSortElement } from './symbol-sort.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './symbol-sort.js';

describe('UUISymbolSortElement', () => {
  let element: UUISymbolSortElement;

  beforeEach(async () => {
    element = render(html` <uui-symbol-sort></uui-symbol-sort> `).container.querySelector('uui-symbol-sort')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});

import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolSortElement } from './uui-symbol-sort.element';
import '.';

describe('UUISymbolSortElement', () => {
  let element: UUISymbolSortElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-sort></uui-symbol-sort> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

import { html, fixture, expect } from '@open-wc/testing';
import { UUISortSymbolElement } from './uui-sort-symbol.element';
import '.';

describe('UUISortSymbolElement', () => {
  let element: UUISortSymbolElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-sort-symbol></uui-sort-symbol> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

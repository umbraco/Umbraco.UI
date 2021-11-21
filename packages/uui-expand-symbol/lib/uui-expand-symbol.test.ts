import { html, fixture, expect } from '@open-wc/testing';
import { UUIExpandSymbolElement } from './uui-expand-symbol.element';
import '.';

describe('UUIExpandSymbolElement', () => {
  let element: UUIExpandSymbolElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-expand-symbol></uui-expand-symbol> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

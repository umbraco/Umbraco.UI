import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolFileElement } from './uui-symbol-file.element';
import '.';

describe('UUISymbolFileElement', () => {
  let element: UUISymbolFileElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-file></uui-symbol-file> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

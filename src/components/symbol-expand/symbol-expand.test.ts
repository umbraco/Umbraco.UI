import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolExpandElement } from './symbol-expand.element';
import './symbol-expand.js';

describe('UUISymbolExpandElement', () => {
  let element: UUISymbolExpandElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-expand></uui-symbol-expand> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

import '../define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUISymbolExpandElement } from './uui-symbol-expand.element';

describe('UUISymbolExpandElement', () => {
  let element: UUISymbolExpandElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-expand></uui-symbol-expand> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

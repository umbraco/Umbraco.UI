import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolMoreElement } from './uui-symbol-more.element';
import '.';

describe('UUISymbolMoreElement', () => {
  let element: UUISymbolMoreElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-more></uui-symbol-more> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

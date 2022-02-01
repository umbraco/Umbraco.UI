import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolLockElement } from './uui-symbol-lock.element';
import '.';

describe('UUISymbolLockElement', () => {
  let element: UUISymbolLockElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-lock></uui-symbol-lock> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

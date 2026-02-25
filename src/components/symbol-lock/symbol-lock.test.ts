import './symbol-lock.js';
import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolLockElement } from './symbol-lock.element';

describe('UUISymbolLockElement', () => {
  let element: UUISymbolLockElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-lock></uui-symbol-lock> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISymbolLockElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

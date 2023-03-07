import { html, fixture, expect } from '@open-wc/testing';
import { UUIModalElement } from './uui-modal.element';

describe('UUIModalElement', () => {
  let element: UUIModalElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-modal></uui-modal> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

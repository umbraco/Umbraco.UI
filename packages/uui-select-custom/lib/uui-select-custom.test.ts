import { html, fixture, expect } from '@open-wc/testing';
import { UUISelectCustomElement } from './uui-select-custom.element';

describe('UUISelectCustomElement', () => {
  let element: UUISelectCustomElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-select-custom></uui-select-custom> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISelectCustomElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
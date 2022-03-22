import { html, fixture, expect } from '@open-wc/testing';
import { UUISelectCountryElement } from './uui-select-country.element';

describe('UUISelectCountryElement', () => {
  let element: UUISelectCountryElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-select-country></uui-select-country> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISelectCountryElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
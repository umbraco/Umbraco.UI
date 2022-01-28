import { html, fixture, expect } from '@open-wc/testing';
import { UUIRadioElement } from './uui-radio.element';
import '.';

describe('UUIRadioElement', () => {
  let element: UUIRadioElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-radio></uui-radio> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

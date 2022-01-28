import './define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUIRadioElement } from './uui-radio.element';

describe('UUIRadioElement', () => {
  let element: UUIRadioElement;

  beforeEach(async () => {
    element = await fixture(html`<uui-radio label="Radio"></uui-radio> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

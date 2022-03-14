import { html, fixture, expect } from '@open-wc/testing';
import { UUISelectListElement } from './uui-select-list.element';

describe('UUISelectListElement', () => {
  let element: UUISelectListElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-select-list></uui-select-list> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISelectListElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

import { html, fixture, expect } from '@open-wc/testing';
import { UUICheckboxGroupElement } from './uui-checkbox-group.element';

describe('UUICheckboxGroupElement', () => {
  let element: UUICheckboxGroupElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-checkbox-group></uui-checkbox-group> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUICheckboxGroupElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

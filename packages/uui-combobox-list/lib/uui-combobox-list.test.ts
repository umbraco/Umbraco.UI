import { html, fixture, expect } from '@open-wc/testing';
import { UUIComboboxListElement } from './uui-combobox-list.element';

describe('UUIComboboxListElement', () => {
  let element: UUIComboboxListElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-combobox-list></uui-combobox-list> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIComboboxListElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

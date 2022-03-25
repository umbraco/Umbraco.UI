import { html, fixture, expect } from '@open-wc/testing';
import { UUIComboboxElement } from './uui-combobox.element';

describe('UUIComboboxElement', () => {
  let element: UUIComboboxElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-combobox></uui-combobox> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIComboboxElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

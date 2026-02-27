import './form-layout-item.js';
import { expect, fixture, html } from '@open-wc/testing';
import '../form-validation-message/form-validation-message.js';

import { UUIFormLayoutItemElement } from './form-layout-item.element';

describe('UUIFormLayoutItemElement', () => {
  let element: UUIFormLayoutItemElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-form-layout-item></uui-form-layout-item>
    `);
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIFormLayoutItemElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('methods', () => {
    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot:not([name])')!;
      expect(slot).to.not.equal(null);
    });

    it('renders an label slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=label]')!;
      expect(slot).to.not.equal(null);
    });

    it('renders an message slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=message]')!;
      expect(slot).to.not.equal(null);
    });
  });
});

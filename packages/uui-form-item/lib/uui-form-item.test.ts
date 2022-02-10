import { html, fixture, expect } from '@open-wc/testing';
import { UUIFormItemElement } from './uui-form-item.element';
import '.';

describe('UUIFormItemElement', () => {
  let element: UUIFormItemElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-form-item></uui-form-item> `);
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIFormItemElement);
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
      expect(slot).to.exist;
    });

    it('renders an message slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=message]')!;
      expect(slot).to.exist;
    });
  });
});

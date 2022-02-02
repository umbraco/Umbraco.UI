import { html, fixture, expect } from '@open-wc/testing';
import { UUIDialogLayoutElement } from './uui-dialog-layout.element';
import '.';

describe('UUIDialogLayoutElement', () => {
  let element: UUIDialogLayoutElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-dialog-layout></uui-dialog-layout> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('headline', () => {
      expect(element).to.have.property('headline');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
    it('renders a headline slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="headline"]')!;
      expect(slot).to.exist;
    });
    it('renders a actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="actions"]')!;
      expect(slot).to.exist;
    });
  });
});

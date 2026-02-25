import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUIDialogLayoutElement } from './dialog-layout.element';
import './dialog-layout.js';

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

  describe('styling', () => {
    it('set display none when no headline is provided', () => {
      const display = element.shadowRoot!.querySelector('h3')!.style.display;

      expect(display).to.equal('none');
    });
    it('set resets display when a headline is provided', async () => {
      element.headline = 'headline';

      await elementUpdated(element);
      const display = element.shadowRoot!.querySelector('h3')!.style.display;

      expect(display).to.equal('');
    });
  });
});

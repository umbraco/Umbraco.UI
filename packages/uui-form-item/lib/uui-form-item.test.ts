import { html, fixture, expect } from '@open-wc/testing';
import { UUIFormItemElement } from './uui-form-item.element';
import '.';

describe('UUIFormItemElement', () => {
  let element: UUIFormItemElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-form-item></uui-form-item> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
    /*
    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await elementUpdated(element);
      expect(input.disabled).to.be.true;
    });
    */
  });

  describe('methods', () => {
    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });
  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });

    it('renders a label slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=label]')!;
      expect(slot).to.exist;
    });

    it('renders an message slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=message]')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    /*
    describe('open', () => {
      it('emits a open event when open-part is clicked', async () => {
        const listener = oneEvent(element, UUICardEvent.OPEN);
        const infoElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#open-part');
        infoElement?.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUICardEvent.OPEN);
      });
    });
    */
  });
});

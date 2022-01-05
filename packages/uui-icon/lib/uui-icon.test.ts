import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { UUIIconElement } from './uui-icon.element';
import '.';
import { UUIIconRequestEvent } from './UUIIconRequestEvent';

const TEST_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"></svg>';

describe('UUIIconElement', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-icon></uui-icon>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a svg property', () => {
      expect(element).to.have.property('svg');
    });

    it('has a fallback property', () => {
      expect(element).to.have.property('fallback');
    });

    it('has a name property', () => {
      expect(element).to.have.property('name');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('ICON_REQUEST', () => {
      it('emits a open event when open-part is clicked', async () => {
        const listener = oneEvent(element, UUIIconRequestEvent.ICON_REQUEST);
        const infoElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#open-part');
        infoElement?.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIIconRequestEvent.ICON_REQUEST);
      });
    });
  });
});

describe('UUIIconElement with svg', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-icon svg=${TEST_SVG}></uui-icon> `);
  });

  it('contains svg of icon', async () => {
    await expect(element).shadowDom.to.equal(TEST_SVG);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIIconElement with fallback', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-icon name="not_existing" fallback=${TEST_SVG}></uui-icon> `
    );
  });

  it('contains svg of icon', async () => {
    await expect(element).shadowDom.to.equal(TEST_SVG);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

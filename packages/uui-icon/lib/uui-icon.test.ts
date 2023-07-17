import '.';
import '@umbraco-ui/uui-icon-registry/lib';

import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { UUIIconRegistryElement } from '@umbraco-ui/uui-icon-registry/lib/uui-icon-registry.element';
import { LitElement } from 'lit';

import { UUIIconElement } from './uui-icon.element';
import { UUIIconRequestEvent } from './UUIIconRequestEvent';

const TEST_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" id="TestIcon" viewBox="0 0 512 512"></svg>';

const TEST_FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" id="TestFallbackIcon" viewBox="0 0 512 512"><rect width="512" height="512" fill="red"></rect></svg>';

describe('UUIIconElement', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-icon></uui-icon>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
    //fallback slot first appears if name didn't pick up an icon from a icon registry.
    // therefor this is tested further below.
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

  describe('events', () => {
    describe('ICON_REQUEST', () => {
      it('emits a icon request event when name is set', async () => {
        const listener = oneEvent(element, UUIIconRequestEvent.ICON_REQUEST);
        element.name = 'test';
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIIconRequestEvent.ICON_REQUEST);
        expect(event.detail.iconName).to.equal('test');
      });
    });
  });

  describe('UUIIconElement with svg', () => {
    let element: UUIIconElement;

    beforeEach(async () => {
      element = await fixture(html` <uui-icon .svg=${TEST_SVG}></uui-icon> `);
    });

    it('contains svg of icon', () => {
      expect(element.shadowRoot!.querySelector('#TestIcon')).to.exist;
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe('UUIIconElement with fallback', () => {
    let element: UUIIconElement;

    beforeEach(async () => {
      element = await fixture(html`
        <uui-icon name="not_existing" .fallback=${TEST_FALLBACK_SVG}></uui-icon>
      `);
    });

    it('contains svg of icon', () => {
      expect(element.shadowRoot!.querySelector('#TestFallbackIcon')).to.exist;
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe('UUIIconElement does not render fallback slot unless name failed', () => {
    let element: UUIIconElement;

    beforeEach(async () => {
      element = await fixture(html`
        <uui-icon>
          <svg
            slot="fallback"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <rect width="512" height="512" fill="red"></rect>
          </svg>
        </uui-icon>
      `);
    });

    it('renders a fallback slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="fallback"]')!;
      expect(slot).not.to.exist;
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });
  describe('UUIIconElement renders fallback slot when name failed', () => {
    let element: UUIIconElement;

    beforeEach(async () => {
      element = await fixture(html`
        <uui-icon name="not_existing">
          <svg
            name="fallback"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <rect width="512" height="512" fill="red"></rect>
          </svg>
        </uui-icon>
      `);
    });

    it('renders a fallback slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="fallback"]');
      expect(slot).to.exist;
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe('UUIIconElement using UUIIconRegistry', () => {
    let registryElement: UUIIconRegistryElement;
    let iconElement: UUIIconElement;

    beforeEach(async () => {
      registryElement = await fixture(html`
        <uui-icon-registry></uui-icon-registry>
      `);
      registryElement.registry.defineIcon('testIcon', TEST_SVG);

      iconElement = await fixture(html`
        <uui-icon name="testIcon"></uui-icon>
      `);
      registryElement.appendChild(iconElement);

      await elementUpdated(iconElement);
    });

    it('Child uui-icon retrieves icon of registry', () => {
      expect(iconElement.shadowRoot!.querySelector('#TestIcon')).to.exist;
    });
  });

  class TestShadowDOMElement extends LitElement {
    public iconElement!: UUIIconElement;

    constructor() {
      super();
      this.iconElement = document.createElement('uui-icon') as UUIIconElement;
      this.iconElement.setAttribute('name', 'testIcon');
    }

    protected firstUpdated(_: any): void {
      super.firstUpdated(_);
      this.shadowRoot!.appendChild(this.iconElement);
    }
  }
  customElements.define('uui-test-shadow-dom', TestShadowDOMElement);

  describe('UUIIconElement can use UUIIconRegistry across shadowDOMs', () => {
    let registryElement: UUIIconRegistryElement;
    let testElement: TestShadowDOMElement;

    beforeEach(async () => {
      registryElement = await fixture(
        html`<uui-icon-registry></uui-icon-registry>`,
      );
      registryElement.registry.defineIcon('testIcon', TEST_SVG);

      testElement = await fixture(
        html`<uui-test-shadow-dom></uui-test-shadow-dom>`,
      );
      registryElement.appendChild(testElement);

      await elementUpdated(testElement);
    });

    it('Child uui-icon retrieves the right SVG data through shadow-dom', () => {
      expect(testElement).to.exist;
      expect(testElement.iconElement).to.exist;
      expect(testElement.iconElement).to.have.property('name');
      expect(testElement.iconElement.shadowRoot!.querySelector('#TestIcon')).to
        .exist;
    });

    it('Child uui-icon passes the a11y audit', async () => {
      await expect(testElement.iconElement).shadowDom.to.be.accessible();
    });
  });
});

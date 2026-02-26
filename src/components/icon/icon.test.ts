import './icon.js';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import '../icon-registry/icon-registry.js';
import './icon.element';

import type { UUIIconRegistryElement } from '../icon-registry/icon-registry.element';
import { LitElement, html} from 'lit';

import type { UUIIconElement } from './icon.element';
import { UUIIconRequestEvent } from './UUIIconRequestEvent';

/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}

const TEST_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" id="TestIcon" viewBox="0 0 512 512"></svg>';

const TEST_FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" id="TestFallbackIcon" viewBox="0 0 512 512"><rect width="512" height="512" fill="red"></rect></svg>';

describe('UUIIconElement', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = render(html` <uui-icon></uui-icon>`).container.querySelector('uui-icon')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
    //fallback slot first appears if name didn't pick up an icon from a icon registry.
    // therefor this is tested further below.
  });

  describe('properties', () => {
    it('has a svg property', () => {
      expect(element).toHaveProperty('svg');
    });

    it('has a fallback property', () => {
      expect(element).toHaveProperty('fallback');
    });

    it('has a name property', () => {
      expect(element).toHaveProperty('name');
    });
  });

  describe('events', () => {
    describe('ICON_REQUEST', () => {
      it('emits a icon request event when name is set', async () => {
        const listener = oneEvent(
          element,
          UUIIconRequestEvent.ICON_REQUEST,
        );
        element.name = 'test';
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIIconRequestEvent.ICON_REQUEST);
        expect(event.detail.iconName).toBe('test');
      });
    });
  });

  describe('UUIIconElement with svg', () => {
    let element: UUIIconElement;

    beforeEach(async () => {
      element = render(html` <uui-icon .svg=${TEST_SVG}></uui-icon> `).container.querySelector('uui-icon')!;

      await element.updateComplete;
    });

    it('contains svg of icon', () => {
      expect(element.shadowRoot!.querySelector('#TestIcon')).not.toBe(null);
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });
  });

  describe('UUIIconElement with fallback', () => {
    let element: UUIIconElement;

    beforeEach(async () => {
      element = render(html`
        <uui-icon name="not_existing" .fallback=${TEST_FALLBACK_SVG}></uui-icon>
      `).container.querySelector('uui-icon')!;

      await element.updateComplete;
    });

    it('contains svg of icon', () => {
      expect(element.shadowRoot!.querySelector('#TestFallbackIcon')).not.toBe(null);
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });
  });

  describe('UUIIconElement does not render fallback slot unless name failed', () => {
    let element: UUIIconElement;

    beforeEach(async () => {
      element = render(html`
        <uui-icon>
          <svg
            slot="fallback"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <rect width="512" height="512" fill="red"></rect>
          </svg>
        </uui-icon>
      `).container.querySelector('uui-icon')!;

      await element.updateComplete;
    });

    it('renders a fallback slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="fallback"]')!;
      expect(slot).toBe(null);
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });
  });
  describe('UUIIconElement renders fallback slot when name failed', () => {
    let element: UUIIconElement;

    beforeEach(async () => {
      element = render(html`
        <uui-icon name="not_existing">
          <svg
            name="fallback"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <rect width="512" height="512" fill="red"></rect>
          </svg>
        </uui-icon>
      `).container.querySelector('uui-icon')!;

      await element.updateComplete;
    });

    it('renders a fallback slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="fallback"]');
      expect(slot).not.toBe(null);
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });
  });

  describe('UUIIconElement using UUIIconRegistry', () => {
    let registryElement: UUIIconRegistryElement;
    let iconElement: UUIIconElement;

    beforeEach(async () => {
      registryElement = render(html`
        <uui-icon-registry></uui-icon-registry>
      `).container.querySelector('uui-icon-registry')!;

      await registryElement.updateComplete;
      registryElement.registry.defineIcon('testIcon', TEST_SVG);

      iconElement = render(html`
        <uui-icon name="testIcon"></uui-icon>
      `).container.querySelector('uui-icon')!;

      await iconElement.updateComplete;
      registryElement.appendChild(iconElement);

      await iconElement.updateComplete;
    });

    it('Child uui-icon retrieves icon of registry', () => {
      expect(iconElement.shadowRoot!.querySelector('#TestIcon')).not.toBe(null);
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
      registryElement = render(html`<uui-icon-registry></uui-icon-registry>`).container.querySelector('uui-icon-registry')!;

      await registryElement.updateComplete;
      registryElement.registry.defineIcon('testIcon', TEST_SVG);

      testElement = render(html`<uui-test-shadow-dom></uui-test-shadow-dom>`).container.querySelector('uui-test-shadow-dom')!;

      await testElement.updateComplete;
      registryElement.appendChild(testElement);

      await testElement.updateComplete;
    });

    it('Child uui-icon retrieves the right SVG data through shadow-dom', () => {
      expect(testElement).not.toBe(null);
      expect(testElement.iconElement).not.toBe(null);
      expect(testElement.iconElement).toHaveProperty('name');
      expect(testElement.iconElement.shadowRoot!.querySelector('#TestIcon')).toBeDefined();
    });

    it('Child uui-icon passes the a11y audit', async () => {
      expect(await axeRun(testElement.iconElement)).toHaveNoViolations();
    });

    it('svg has a size of 18px for both width and height', () => {
      const svgElement =
        testElement.iconElement.shadowRoot!.querySelector('svg')!;
      const computedStyle = getComputedStyle(svgElement);
      expect(computedStyle.width).toBe('18px');
      expect(computedStyle.height).toBe('18px');
    });
  });
});

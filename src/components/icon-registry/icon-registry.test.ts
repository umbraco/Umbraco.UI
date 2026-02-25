import './icon-registry.js';
import '../icon/icon.js';
import './icon-registry.element';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import type { UUIIconElement } from '../icon/icon.element';

import type { UUIIconRegistryElement } from './icon-registry.element';
import { UUIIconRegistry } from './UUIIconRegistry';

const myCustomSVGData =
  '<svg xmlns="http://www.w3.org/2000/svg" id="MyCustomIcon" viewBox="0 0 512 512"><rect width="512" height="512" fill="green"></rect></svg>';

describe('UUIIconRegistryElement', () => {
  let element: UUIIconRegistryElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-icon-registry></uui-icon-registry> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  describe('properties', () => {
    it('has a registry property', () => {
      expect(element).to.have.property('registry');
    });
  });

  describe('UUIIconRegistryElement Add icon to registry', () => {
    let registryElement: UUIIconRegistryElement;
    let iconElement: UUIIconElement;

    beforeEach(async () => {
      registryElement = await fixture(
        html`<uui-icon-registry></uui-icon-registry>`,
      );
      registryElement.registry.defineIcon('myCustomIcon', myCustomSVGData);

      iconElement = await fixture(html`
        <uui-icon name="myCustomIcon"></uui-icon>
      `);
      registryElement.appendChild(iconElement);

      await elementUpdated(iconElement);
    });

    it('Child uui-icon retrieves the right SVG data through shadow-dom', () => {
      expect(iconElement.shadowRoot!.querySelector('#MyCustomIcon')).to.exist;
    });
  });

  class MyCustomIconRegistry extends UUIIconRegistry {
    protected acceptIcon(iconName: string): boolean {
      if (iconName === 'myCustomIcon') {
        const icon = this.provideIcon(iconName);

        // Define SVG now or later when SVG data is loaded:
        icon.svg = myCustomSVGData;

        return true;
      }

      return false;
    }
  }

  describe('UUIIconRegistryElement Use custom icon registry', () => {
    let registryElement: UUIIconRegistryElement;
    let iconElement: UUIIconElement;

    beforeEach(async () => {
      registryElement = await fixture(
        html`<uui-icon-registry></uui-icon-registry>`,
      );
      registryElement.registry = new MyCustomIconRegistry();

      iconElement = await fixture(html`
        <uui-icon name="myCustomIcon"></uui-icon>
      `);
      registryElement.appendChild(iconElement);
    });

    it('Child uui-icon retrieves the custom SVG data', async () => {
      await elementUpdated(iconElement);
      expect(iconElement.shadowRoot!.querySelector('#MyCustomIcon')).to.exist;
    });
  });
});

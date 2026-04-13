import './icon-registry.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import '../icon/icon.js';
import './icon-registry.element';

import type { UUIIconElement } from '../icon/icon.element';

import type { UUIIconRegistryElement } from './icon-registry.element';
import { UUIIconRegistry } from './UUIIconRegistry';

const myCustomSVGData =
  '<svg xmlns="http://www.w3.org/2000/svg" id="MyCustomIcon" viewBox="0 0 512 512"><rect width="512" height="512" fill="green"></rect></svg>';

describe('UUIIconRegistryElement', () => {
  let element: UUIIconRegistryElement;

  beforeEach(async () => {
    element = render(html` <uui-icon-registry></uui-icon-registry> `).container.querySelector('uui-icon-registry')!;

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
  });

  describe('properties', () => {
    it('has a registry property', () => {
      expect(element).toHaveProperty('registry');
    });
  });

  describe('UUIIconRegistryElement Add icon to registry', () => {
    let registryElement: UUIIconRegistryElement;
    let iconElement: UUIIconElement;

    beforeEach(async () => {
      registryElement = render(html`<uui-icon-registry></uui-icon-registry>`).container.querySelector('uui-icon-registry')!;

      await registryElement.updateComplete;
      registryElement.registry.defineIcon('myCustomIcon', myCustomSVGData);

      iconElement = render(html`
        <uui-icon name="myCustomIcon"></uui-icon>
      `).container.querySelector('uui-icon')!;

      await iconElement.updateComplete;
      registryElement.appendChild(iconElement);

      await iconElement.updateComplete;
    });

    it('Child uui-icon retrieves the right SVG data through shadow-dom', () => {
      expect(iconElement.shadowRoot!.querySelector('#MyCustomIcon')).not.toBe(null);
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
      registryElement = render(html`<uui-icon-registry></uui-icon-registry>`).container.querySelector('uui-icon-registry')!;

      await registryElement.updateComplete;
      registryElement.registry = new MyCustomIconRegistry();

      iconElement = render(html`
        <uui-icon name="myCustomIcon"></uui-icon>
      `).container.querySelector('uui-icon')!;

      await iconElement.updateComplete;
      registryElement.appendChild(iconElement);
    });

    it('Child uui-icon retrieves the custom SVG data', async () => {
      await iconElement.updateComplete;
      expect(iconElement.shadowRoot!.querySelector('#MyCustomIcon')).not.toBe(null);
    });
  });
});

import './icon-registry-essential.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './icon-registry-essential.element';
import '../icon/icon.js';
import type { UUIIconRegistryEssentialElement } from './icon-registry-essential.element';
import type { UUIIconElement } from '../icon/icon.element';

describe('UUIIconRegistryEssentialElement', () => {
  let element: UUIIconRegistryEssentialElement;

  beforeEach(async () => {
    element = render(html`
      <uui-icon-registry-essential></uui-icon-registry-essential>
    `).container.querySelector('uui-icon-registry-essential')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('UUIIcon retrieves SVG data from icon registry', () => {
    let registryElement: UUIIconRegistryEssentialElement;
    let iconElement: UUIIconElement;

    beforeEach(async () => {
      registryElement = render(html`<uui-icon-registry-essential
          ><uui-icon name="check"></uui-icon
        ></uui-icon-registry-essential>`).container.querySelector('uui-icon-registry-essential')!;

      await registryElement.updateComplete;

      iconElement = registryElement.querySelector('uui-icon') as UUIIconElement;
    });

    it('Child uui-icon retrieved some SVG data', () => {
      expect(iconElement.shadowRoot!.querySelector('svg')).not.toBe(null);
    });
  });
});

import { html, fixture, expect } from '@open-wc/testing';
import { UUIIconRegistryEssentialElement } from './uui-icon-registry-essential.element';
import '.';
import { UUIIconElement } from '@umbraco-ui/uui-icon/lib';

describe('UUIIconRegistryEssentialElement', () => {
  let element: UUIIconRegistryEssentialElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-icon-registry-essential></uui-icon-registry-essential> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('UUIIcon retrieves SVG data from icon registry', () => {
    let registryElement: UUIIconRegistryEssentialElement;
    let iconElement: UUIIconElement;

    beforeEach(async () => {
      registryElement = await fixture(
        html`<uui-icon-registry-essential
          ><uui-icon name="check"></uui-icon
        ></uui-icon-registry-essential>`
      );

      iconElement = registryElement.querySelector('uui-icon') as UUIIconElement;
    });

    it('Child uui-icon retrieved some SVG data', () => {
      expect(iconElement.shadowRoot!.querySelector('svg')).to.exist;
    });
  });
});

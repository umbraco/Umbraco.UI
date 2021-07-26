import { html, fixture, expect } from '@open-wc/testing';
import { UUILayerContainerElement } from './uui-layer-container.element';
import '.';

describe('UuiLayerContainer', () => {
  let element: UUILayerContainerElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-layer>Hello uui-dialog</uui-layer> `);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

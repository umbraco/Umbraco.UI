import { html, fixture, expect } from '@open-wc/testing';
import { UUILayerElement } from './uui-layer.element';
import '.';

describe('UuiDialog', () => {
  let element: UUILayerElement;
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

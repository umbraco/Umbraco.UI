import { html, fixture, expect } from '@open-wc/testing';
import { UUIModalElement } from './uui-modal.element';
import '.';

describe('UuiModal', () => {
  let element: UUIModalElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-modal>Hello uui-dialog</uui-modal> `);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

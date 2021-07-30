import { html, fixture, expect } from '@open-wc/testing';
import { UUIModalStackContainerElement } from './uui-modal-stack-container.element';
import '.';

describe('UuiModalStackContainer', () => {
  let element: UUIModalStackContainerElement;
  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-modal-stack-container>Hello uui-dialog</uui-modal-stack-container>
      `
    );
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

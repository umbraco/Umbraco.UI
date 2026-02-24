import { html, fixture, expect } from '@open-wc/testing';
import { UUIButtonGroupElement } from './uui-button-group.element';
import '../button/index.js';

describe('UuiButtonGroup', () => {
  let element: UUIButtonGroupElement;
  beforeEach(async () => {
    element = await fixture(html`
      <uui-button-group
        ><uui-button label="My label">Hello uui-button</uui-button
        ><uui-button label="My label">Hello uui-button</uui-button
        ><uui-button label="My label"
          >Hello uui-button</uui-button
        ></uui-button-group
      >
    `);
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIButtonGroupElement);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

import { html, fixture, expect } from '@open-wc/testing';
import { UUIPopoverContainerElement } from './uui-popover-container.element';

describe('UUIPopoverContainerElement', () => {
  let element: UUIPopoverContainerElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-popover-container id="my-popover">
        Hello world
      </uui-popover-container>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIPopoverContainerElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('gets the popover attribute', async () => {
    await element.updateComplete;
    expect(element).to.have.attribute('popover');
  });
});

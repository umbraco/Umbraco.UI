import { html, fixture, expect } from '@open-wc/testing';
import { UUISplitPanelElement } from './uui-split-panel.element';

describe('UUISplitPanelElement', () => {
  let element: UUISplitPanelElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-split-panel></uui-split-panel> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISplitPanelElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
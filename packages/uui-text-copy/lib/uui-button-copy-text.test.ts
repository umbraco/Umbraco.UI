import { html, fixture, expect } from '@open-wc/testing';
import { UUIButtonCopyTextElement } from './uui-button-copy-text.element';

describe('UUIButtonCopyTextElement', () => {
  let element: UUIButtonCopyTextElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-button-copy-text value="Oh hi there"></uui-button-copy-text>`,
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIButtonCopyTextElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('renders correctly', async () => {
    expect(element).shadowDom.to.contain(
      '<uui-icon name="copy"></uui-icon> Copy',
    );
  });
});

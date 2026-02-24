import { html, fixture, expect } from '@open-wc/testing';
import { UUIButtonCopyTextElement } from './uui-button-copy-text.element';
import '../icon/index.js';

describe('UUIButtonCopyTextElement', () => {
  let element: UUIButtonCopyTextElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-button-copy-text
        text="Oh hi there"
        label="Copy"></uui-button-copy-text>`,
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIButtonCopyTextElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('renders correctly', async () => {
    expect(element.shadowRoot?.innerHTML).to.contain(
      '<uui-icon name="copy" aria-hidden="true"></uui-icon>',
    );
  });
});

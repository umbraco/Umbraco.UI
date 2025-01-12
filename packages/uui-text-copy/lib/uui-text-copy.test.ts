import { html, fixture, expect } from '@open-wc/testing';
import { UUITextCopyElement } from './uui-text-copy.element';

describe('UUITextCopyElement', () => {
  let element: UUITextCopyElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-text-copy value="Oh hi there"></uui-text-copy>`,
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUITextCopyElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('renders correctly', async () => {
    expect(element).shadowDom.to.equal(`
      <uui-button>
        <slot>
          <uui-icon name="copy"></uui-icon> Copy
        </slot>
      </uui-button>
    `);
  });
});

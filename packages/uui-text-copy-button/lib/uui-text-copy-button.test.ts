import { html, fixture, expect } from '@open-wc/testing';
import { UUITextCopyButtonElement } from './uui-text-copy-button.element';

describe('UUICopyElement', () => {
  let element: UUITextCopyButtonElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-text-copy-button value="Oh hi there"></uui-text-copy-button>`,
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUITextCopyButtonElement);
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

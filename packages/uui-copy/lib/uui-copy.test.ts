import { html, fixture, expect } from '@open-wc/testing';
import { UUICopyElement } from './uui-copy.element';

describe('UUICopyElement', () => {
  let element: UUICopyElement;

  beforeEach(async () => {
    element = await fixture(html`<uui-copy value="Oh hi there"></uui-copy>`);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUICopyElement);
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

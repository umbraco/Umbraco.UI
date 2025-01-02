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

  it('copies the value property to clipboard when button is clicked', async () => {
    const button = element.shadowRoot?.querySelector('uui-button');
    // // Mock the clipboard API
    // navigator.clipboard = {
    //   writeText: async text => {
    //     expect(text).to.equal('Test Text');
    //     return Promise.resolve();
    //   },
    // };

    button?.click();
  });

  it('fires copying and copied events', async () => {
    const button = element.shadowRoot?.querySelector('uui-button');
    // // Mock the clipboard API
    // navigator.clipboard = {
    //   writeText: async text => {
    //     return Promise.resolve();
    //   },
    // };

    let copyingEventFired = false;
    let copiedEventFired = false;

    element.addEventListener('copying', () => {
      copyingEventFired = true;
    });

    element.addEventListener('copied', () => {
      copiedEventFired = true;
    });

    button?.click();

    expect(copyingEventFired).to.be.true;
    expect(copiedEventFired).to.be.true;
  });
});

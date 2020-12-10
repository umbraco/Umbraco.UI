import { html, fixture, expect } from '@open-wc/testing';

import '.';
import { UUIButtonElement } from './uui-button.element';

describe('UuiButton', () => {
  let element: UUIButtonElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-button>Hello uui-button</uui-button> `);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('test that disable works', async () => {
    return true;
  });
});

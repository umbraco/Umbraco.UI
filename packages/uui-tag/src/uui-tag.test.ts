import { html, fixture, expect } from '@open-wc/testing';
import { UUITagElement } from './uui-tag.element';
import './index';

describe('UuiTag', () => {
  let element: UUITagElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-tag>Tag description</uui-tag> `);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

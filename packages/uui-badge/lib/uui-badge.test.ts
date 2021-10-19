import { html, fixture, expect } from '@open-wc/testing';
import '.';
import { UUIBadgeElement } from './uui-badge.element';

describe('UuiBadge', () => {
  let element: UUIBadgeElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-badge>Hello uui-button</uui-badge> `);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

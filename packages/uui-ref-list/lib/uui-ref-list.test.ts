import '../define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUIRefListElement } from './uui-ref-list.element';

describe('UUIRefListElement', () => {
  let element: UUIRefListElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-ref-list></uui-ref-list> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('renders a default slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });
});

import { expect, fixture, html } from '@open-wc/testing';

import { UUIActionBarElement } from './uui-action-bar.element';

describe('UUIActionBarElement', () => {
  let element: UUIActionBarElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-action-bar></uui-action-bar> `);
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIActionBarElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });
});

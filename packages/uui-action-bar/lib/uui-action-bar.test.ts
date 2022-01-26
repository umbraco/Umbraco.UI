import { html, fixture, expect } from '@open-wc/testing';
import { UUIActionBarElement } from './uui-action-bar.element';
import '.';

describe('UUIActionBarElement', () => {
  let element: UUIActionBarElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-action-bar></uui-action-bar> `);
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

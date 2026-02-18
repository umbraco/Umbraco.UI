import { html, fixture, expect } from '@open-wc/testing';
import './uui-badge.element';
import type { UUIBadgeElement } from './uui-badge.element';

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

  describe('properties', () => {
    it('has a color property', () => {
      expect(element).to.have.property('color');
    });

    it('has a attention property', () => {
      expect(element).to.have.property('attention');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });
});

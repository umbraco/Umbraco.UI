import { html, fixture, expect } from '@open-wc/testing';
import { UUITagElement } from './tag.element';
import './tag.js';

describe('UuiTag', () => {
  let element: UUITagElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-tag>Tag description</uui-tag> `);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.not.equal(null);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a color property', () => {
      expect(element).to.have.property('color');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.not.equal(null);
    });
  });
});

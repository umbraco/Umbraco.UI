import { UUITagElement } from './tag.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './tag.js';

describe('UuiTag', () => {
  let element: UUITagElement;
  beforeEach(async () => {
    element = render(html` <uui-tag>Tag description</uui-tag> `).container.querySelector('uui-tag')!;

    await element.updateComplete;
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).not.toBe(null);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has a color property', () => {
      expect(element).toHaveProperty('color');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });
});

import './badge.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './badge.element';
import type { UUIBadgeElement } from './badge.element';

describe('UuiBadge', () => {
  let element: UUIBadgeElement;
  beforeEach(async () => {
    element = render(html` <uui-badge>Hello uui-button</uui-badge> `).container.querySelector('uui-badge')!;

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

    it('has a attention property', () => {
      expect(element).toHaveProperty('attention');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });
});

import { UUIDialogLayoutElement } from './dialog-layout.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './dialog-layout.js';

describe('UUIDialogLayoutElement', () => {
  let element: UUIDialogLayoutElement;

  beforeEach(async () => {
    element = render(html` <uui-dialog-layout></uui-dialog-layout> `).container.querySelector('uui-dialog-layout')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('headline', () => {
      expect(element).toHaveProperty('headline');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
    it('renders a headline slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="headline"]')!;
      expect(slot).not.toBe(null);
    });
    it('renders a actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name="actions"]')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('styling', () => {
    it('set display none when no headline is provided', () => {
      const display = element.shadowRoot!.querySelector('h3')!.style.display;

      expect(display).toBe('none');
    });
    it('set resets display when a headline is provided', async () => {
      element.headline = 'headline';

      await element.updateComplete;
      const display = element.shadowRoot!.querySelector('h3')!.style.display;

      expect(display).toBe('');
    });
  });
});

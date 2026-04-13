import { UUITabElement } from './tab.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import './tabs.js';

describe('UuiTab', () => {
  let element: UUITabElement;

  beforeEach(async () => {
    element = render(html`
      <uui-tab label="My label">Hello uui-tab</uui-tab>
    `).container.querySelector('uui-tab')!;

    await element.updateComplete;
  });

  it('is defined as its own instance', () => {
    expect(element).toBeInstanceOf(UUITabElement);
  });

  describe('properties', () => {
    it('has a label property', () => {
      expect(element).toHaveProperty('label');
    });

    it('has a disable property', () => {
      expect(element).toHaveProperty('disabled');
    });
    it('disable property defaults to false', () => {
      expect(element.disabled).toBe(false);
    });

    it('has a href property', () => {
      expect(element).toHaveProperty('href');
    });

    it('has a target property', () => {
      expect(element).toHaveProperty('target');
    });

    it('has a rel property', () => {
      expect(element).toHaveProperty('rel');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
    it('renders a icon slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=icon]')!;
      expect(slot).not.toBe(null);
    });
    it('renders a extra slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=extra]')!;
      expect(slot).not.toBe(null);
    });
    it('renders a button', () => {
      const slot = element.shadowRoot!.querySelector('button')!;
      expect(slot).not.toBe(null);
    });
    it('renders a anchor tag when href is defined', () => {
      element.setAttribute('href', 'https://www.umbraco.com');
      const slot = element.shadowRoot!.querySelector('button')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('click', () => {
    let wasClicked: boolean;

    beforeEach(async () => {
      wasClicked = false;
      element.addEventListener('click', () => {
        wasClicked = true;
      });
    });

    it('dispatches click event when type is button', async () => {
      element.click();
      expect(wasClicked).toBe(true);
    });

    it('does not click when disabled', async () => {
      element.disabled = true;
      element.click();
      expect(wasClicked).toBe(false);
    });
  });

  describe('HREF', () => {
    let anchorElement: HTMLElement;
    let element: UUITabElement;

    beforeEach(async () => {
      element = render(html`<uui-tab
          label="menuitem"
          href="https://www.umbraco.com"></uui-tab>`).container.querySelector('uui-tab')!;

      await element.updateComplete;
      anchorElement = element.shadowRoot!.querySelector(
        '#button',
      ) as HTMLElement;
    });

    it('anchor element is defined', () => {
      expect(anchorElement).toBeInstanceOf(HTMLElement);
    });

    it('label is rendered as an anchor tag', async () => {
      await element.updateComplete;
      expect(anchorElement.nodeName).toBe('A');
    });

    it('target is applied to anchor tag', async () => {
      element.target = '_self';
      await element.updateComplete;
      expect(anchorElement.getAttribute('target')).toBe('_self');
    });
    it('when target is _blank and rel is not defined rel attribute is set.', async () => {
      element.target = '_blank';
      await element.updateComplete;
      expect(anchorElement.getAttribute('target')).toBe('_blank');
      expect(anchorElement.getAttribute('rel')).toBe(
        'noopener noreferrer',
      );
    });

    it('when rel is applied to anchor tag.', async () => {
      element.rel = 'noreferrer';
      await element.updateComplete;
      expect(anchorElement.getAttribute('rel')).toBe('noreferrer');
    });

    it('when target is _blank and rel is defined rel attribute is set.', async () => {
      element.target = '_blank';
      element.rel = 'noopener';
      await element.updateComplete;
      expect(anchorElement.getAttribute('target')).toBe('_blank');
      expect(anchorElement.getAttribute('rel')).toBe('noopener');
    });
  });
});

import './responsive-container.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIResponsiveContainerElement } from './responsive-container.element';

describe('UuiResponsiveContainer', () => {
  let element: UUIResponsiveContainerElement;

  beforeEach(async () => {
    element = render(html`
      <uui-responsive-container>
        <button>Button 1</button>
        <button>Button 2</button>
      </uui-responsive-container>
    `).container.querySelector('uui-responsive-container')!;

    await element.updateComplete;
  });

  afterEach(() => {
    element?.remove();
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIResponsiveContainerElement);
  });

  it('renders a slot for content', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).not.toBe(null);
  });

  it('has a more button', () => {
    const moreButton = element.shadowRoot!.querySelector('#more-button');
    expect(moreButton).not.toBe(null);
  });

  it('has a popover container', () => {
    const popover = element.shadowRoot!.querySelector('#popover-container');
    expect(popover).not.toBe(null);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
  it('has an items container', () => {
    const itemsContainer =
      element.shadowRoot!.querySelector('#items-container');
    expect(itemsContainer).not.toBe(null);
  });

  it('has a main container', () => {
    const main = element.shadowRoot!.querySelector('#main');
    expect(main).not.toBe(null);
  });

  describe('collapse property', () => {
    it('has a collapse property', () => {
      expect(element).toHaveProperty('collapse');
    });

    it('has default collapse value of "end"', () => {
      expect(element.collapse).toBe('end');
    });

    it('can set collapse to "start"', async () => {
      element.collapse = 'start';
      await element.updateComplete;
      expect(element.collapse).toBe('start');
    });

    it('can set collapse to "end"', async () => {
      element.collapse = 'end';
      await element.updateComplete;
      expect(element.collapse).toBe('end');
    });

    it('reflects collapse attribute', async () => {
      element.collapse = 'start';
      await element.updateComplete;
      expect(element.getAttribute('collapse')).toBe('start');
    });
  });

  describe('collapse="start"', () => {
    beforeEach(async () => {
      element = render(html`
        <uui-responsive-container collapse="start">
          <button>Button 1</button>
          <button>Button 2</button>
        </uui-responsive-container>
      `).container.querySelector('uui-responsive-container')!;

      await element.updateComplete;
    });

    it('sets collapse from attribute', () => {
      expect(element.collapse).toBe('start');
    });

    it('positions more button before items container', () => {
      const main = element.shadowRoot!.querySelector('#main')!;
      const children = Array.from(main.children);
      const moreButtonIndex = children.findIndex(
        child => child.id === 'more-button',
      );
      const itemsContainerIndex = children.findIndex(
        child => child.id === 'items-container',
      );
      expect(moreButtonIndex).toBeLessThan(itemsContainerIndex);
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });
  });

  describe('collapse="end"', () => {
    beforeEach(async () => {
      element = render(html`
        <uui-responsive-container collapse="end">
          <button>Button 1</button>
          <button>Button 2</button>
        </uui-responsive-container>
      `).container.querySelector('uui-responsive-container')!;

      await element.updateComplete;
    });

    it('sets collapse from attribute', () => {
      expect(element.collapse).toBe('end');
    });

    it('positions more button after items container', () => {
      const main = element.shadowRoot!.querySelector('#main')!;
      const children = Array.from(main.children);
      const moreButtonIndex = children.findIndex(
        child => child.id === 'more-button',
      );
      const itemsContainerIndex = children.findIndex(
        child => child.id === 'items-container',
      );
      expect(moreButtonIndex).toBeGreaterThan(itemsContainerIndex);
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });
  });
});

import './popover-container.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIPopoverContainerElement } from './popover-container.element';
import '../button/button.js';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class DummyElementWithShadowDom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `<div style="height: 200px; overflow: auto;" id="scrollable-div">
        <slot></slot>
      </div>`;
  }
}
customElements.define('dummy-shadow-dom', DummyElementWithShadowDom);

describe('UUIPopoverContainerElement', () => {
  let element: UUIPopoverContainerElement;

  beforeEach(async () => {
    element = render(html`
      <uui-popover-container id="my-popover">
        Hello world
      </uui-popover-container>
    `).container.querySelector('uui-popover-container')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIPopoverContainerElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('gets the popover attribute', async () => {
    await element.updateComplete;
    expect(element.hasAttribute('popover')).toBe(true);
  });

  describe('scroll parent detection', () => {
    it('should properly detect scroll parents in nested shadow DOM containers', async () => {
      // Create a test structure with nested shadow DOM and scroll containers
      const testContainer = render(html`
        <main>
          <div style="height: 300px; overflow: auto;" id="outer-scroll">
            <dummy-shadow-dom>
              <div style="height: 200px; overflow: auto;" id="inner-scroll">
                <div style="height: 100px;"></div>
                <uui-button
                  id="trigger-button"
                  popovertarget="test-popover"
                  label="Open"></uui-button>
                <div style="height: 400px;"></div>
              </div>
            </dummy-shadow-dom>
            <div style="height: 500px;"></div>
          </div>
          <uui-popover-container id="test-popover" popover>
            Test content
          </uui-popover-container>
        </main>
      `).container.querySelector('main')!;

      const popover = testContainer.querySelector(
        '#test-popover',
      ) as UUIPopoverContainerElement;
      const button = testContainer.querySelector('#trigger-button');

      // Trigger the popover open
      button?.click();
      await sleep(100);

      // Access the private scroll parents array for testing
      const scrollParents = popover._getScrollParents();

      // Should find all scroll containers
      expect(scrollParents.length).toBe(4); // inner-scroll, scrollable-div, outer-scroll, document.body

      // Should include the document.body as the last element
      expect(scrollParents[scrollParents.length - 1]).toBe(document.body);
    });

    it('should ignore scroll parents with position: absolute', async () => {
      // Create a test structure with nested shadow DOM and scroll containers
      const testContainer = render(html`
        <main>
          <div style="height: 300px; overflow: auto;" id="outer-scroll">
            <div style="position: absolute; top:0; left:0;" id="inner-scroll">
              <div style="height: 100px;"></div>
              <uui-button
                id="trigger-button"
                popovertarget="test-popover"
                label="Open"></uui-button>
              <div style="height: 400px;"></div>
            </div>
            <div style="height: 500px;"></div>
          </div>
          <uui-popover-container id="test-popover" popover>
            Test content
          </uui-popover-container>
        </main>
      `).container.querySelector('main')!;

      const popover = testContainer.querySelector(
        '#test-popover',
      ) as UUIPopoverContainerElement;
      const innerScroll = testContainer.querySelector(
        '#inner-scroll',
      ) as HTMLElement;
      const button = testContainer.querySelector('#trigger-button');

      // Trigger the popover open
      button?.click();
      await sleep(100);

      // Access the private scroll parents array for testing
      const scrollParents = popover._getScrollParents();

      // Should not contain the inner scroll since it's position: absolute
      expect(scrollParents).not.toContain(innerScroll);
    });

    it('should reset scroll parents when called multiple times', async () => {
      const testContainer = render(html`
        <main>
          <div style="height: 300px; overflow: auto;" id="scroll-container">
            <uui-button
              id="trigger-button"
              popovertarget="test-popover"
              label="Open"></uui-button>
            <div style="height: 400px;"></div>
          </div>
          <uui-popover-container id="test-popover" popover>
            Test content
          </uui-popover-container>
        </main>
      `).container.querySelector('main')!;

      const popover = testContainer.querySelector(
        '#test-popover',
      ) as UUIPopoverContainerElement;
      const button = testContainer.querySelector('#trigger-button');

      // Open and close the popover multiple times
      button?.click();
      await sleep(50);
      popover.hidePopover();
      await sleep(50);

      button?.click();
      await sleep(50);

      const scrollParents = popover._getScrollParents();

      // Should not have duplicate entries
      const uniqueParents = [...new Set(scrollParents)];
      expect(scrollParents.length).toBe(uniqueParents.length);
    });
  });

  describe('available height CSS custom property', () => {
    it('should set --_available-height when opened', async () => {
      const testContainer = render(html`
        <main>
          <uui-button
            id="trigger-button"
            popovertarget="test-popover"
            label="Open"></uui-button>
          <uui-popover-container
            id="test-popover"
            popover
            placement="bottom-start">
            <div>Content</div>
          </uui-popover-container>
        </main>
      `).container.querySelector('main')!;

      const popover = testContainer.querySelector(
        '#test-popover',
      ) as UUIPopoverContainerElement;
      const button = testContainer.querySelector(
        '#trigger-button',
      ) as HTMLElement;

      expect(popover.style.getPropertyValue('--_available-height')).toBe('');

      button?.click();
      await sleep(100);

      const value = popover.style.getPropertyValue('--_available-height');
      expect(value).toMatch(/^\d+(\.\d+)?px$/);

      const numericValue = parseFloat(value);
      expect(numericValue).toBeGreaterThan(0);
    });

    it('should subtract margin from --_available-height', async () => {
      const margin = 16;

      const container = render(html`
        <main style="position:relative; height:500px;">
          <uui-button
            id="btn1"
            popovertarget="p1"
            label="Open"
            style="position:absolute; top:50px; left:0;"></uui-button>
          <uui-popover-container
            id="p1"
            popover
            placement="bottom-start"
            margin="0">
            <div>Content</div>
          </uui-popover-container>
          <uui-button
            id="btn2"
            popovertarget="p2"
            label="Open"
            style="position:absolute; top:50px; left:150px;"></uui-button>
          <uui-popover-container
            id="p2"
            popover
            placement="bottom-start"
            margin="${margin}">
            <div>Content</div>
          </uui-popover-container>
        </main>
      `).container.querySelector('main')!;

      (container.querySelector('#btn1') as HTMLElement)?.click();
      await sleep(100);
      const withoutMargin = parseFloat(
        (
          container.querySelector('#p1') as UUIPopoverContainerElement
        ).style.getPropertyValue('--_available-height'),
      );

      (container.querySelector('#btn2') as HTMLElement)?.click();
      await sleep(100);
      const withMargin = parseFloat(
        (
          container.querySelector('#p2') as UUIPopoverContainerElement
        ).style.getPropertyValue('--_available-height'),
      );

      expect(withMargin).toBe(withoutMargin - 2 * margin);
    });

    it('should apply --_available-height to uui-scroll-container', async () => {
      const testContainer = render(html`
        <main>
          <uui-button
            id="trigger-button"
            popovertarget="test-popover"
            label="Open"></uui-button>
          <uui-popover-container
            id="test-popover"
            popover
            placement="bottom-start">
            <div>Content</div>
          </uui-popover-container>
        </main>
      `).container.querySelector('main')!;

      const popover = testContainer.querySelector(
        '#test-popover',
      ) as UUIPopoverContainerElement;

      (testContainer.querySelector('#trigger-button') as HTMLElement)?.click();
      await sleep(100);

      const scrollContainer = popover.shadowRoot?.querySelector(
        'uui-scroll-container',
      ) as HTMLElement;

      const maxHeight = getComputedStyle(scrollContainer).maxHeight;
      expect(maxHeight).not.toBe('none');
      expect(maxHeight).not.toBe('');
    });
  });
});

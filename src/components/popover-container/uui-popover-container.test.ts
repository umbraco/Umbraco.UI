import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import { UUIPopoverContainerElement } from './uui-popover-container.element';
import '../button/index.js';

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
    element = await fixture(html`
      <uui-popover-container id="my-popover">
        Hello world
      </uui-popover-container>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIPopoverContainerElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('gets the popover attribute', async () => {
    await element.updateComplete;
    expect(element).to.have.attribute('popover');
  });

  describe('scroll parent detection', () => {
    it('should properly detect scroll parents in nested shadow DOM containers', async () => {
      // Create a test structure with nested shadow DOM and scroll containers
      const testContainer = await fixture(html`
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
      `);

      const popover = testContainer.querySelector(
        '#test-popover',
      ) as UUIPopoverContainerElement;
      const button = testContainer.querySelector('#trigger-button');

      // Trigger the popover open
      button?.click();
      await aTimeout(100);

      // Access the private scroll parents array for testing
      const scrollParents = popover._getScrollParents();

      // Should find all scroll containers
      expect(scrollParents.length).to.be.equal(3); // outer-scroll, inner-scroll, document.body

      // Should include the document.body as the last element
      expect(scrollParents[scrollParents.length - 1]).to.equal(document.body);
    });

    it('should ignore scroll parents with position: absolute', async () => {
      // Create a test structure with nested shadow DOM and scroll containers
      const testContainer = await fixture(html`
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
      `);

      const popover = testContainer.querySelector(
        '#test-popover',
      ) as UUIPopoverContainerElement;
      const innerScroll = testContainer.querySelector(
        '#inner-scroll',
      ) as HTMLElement;
      const button = testContainer.querySelector('#trigger-button');

      // Trigger the popover open
      button?.click();
      await aTimeout(100);

      // Access the private scroll parents array for testing
      const scrollParents = popover._getScrollParents();

      // Should not contain the inner scroll since it's position: absolute
      expect(scrollParents).to.not.include(innerScroll);
    });

    it('should reset scroll parents when called multiple times', async () => {
      const testContainer = await fixture(html`
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
      `);

      const popover = testContainer.querySelector(
        '#test-popover',
      ) as UUIPopoverContainerElement;
      const button = testContainer.querySelector('#trigger-button');

      // Open and close the popover multiple times
      button?.click();
      await aTimeout(50);
      popover.hidePopover();
      await aTimeout(50);

      button?.click();
      await aTimeout(50);

      const scrollParents = popover._getScrollParents();

      // Should not have duplicate entries
      const uniqueParents = [...new Set(scrollParents)];
      expect(scrollParents.length).to.equal(uniqueParents.length);
    });
  });
});

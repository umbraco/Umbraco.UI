import './popover-container.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
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

// A trigger, an auto popover with a nested popover, and a button outside both.
const popoverMarkup = (tag = 'uui-popover-container') =>
  `<button id="trigger" popovertarget="popover">Open</button>
  <button id="outside">Outside</button>
  <p id="blank">Nothing to focus</p>
  <${tag} id="popover" popover>
    <button id="inside">Inside</button>
    <button id="nested-trigger" popovertarget="nested">Open nested</button>
    <${tag} id="nested" popover>
      <button id="nested-inside">Nested inside</button>
    </${tag}>
  </${tag}>`;

class PopoverInShadowDom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = popoverMarkup();
  }
}
customElements.define('popover-in-shadow-dom', PopoverInShadowDom);

/** The focused element, looking through shadow roots. */
function deepActiveElement() {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

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

  describe('positioning', () => {
    afterEach(() => {
      document.documentElement.removeAttribute('dir');
    });

    for (const dir of ['ltr', 'rtl']) {
      it(`anchors the popover to its target in a ${dir} document`, async () => {
        // The popover is positioned against the viewport, which takes its direction from the root element.
        document.documentElement.dir = dir;
        const container = render(html`
          <main>
            <uui-button
              id="trigger-button"
              popovertarget="test-popover"
              label="Open"
              style="position:fixed; top:50px; left:200px;"></uui-button>
            <uui-popover-container
              id="test-popover"
              popover
              placement="bottom-start">
              <div style="width:100px; height:50px;">Content</div>
            </uui-popover-container>
          </main>
        `).container.querySelector('main')!;

        const popover = container.querySelector(
          '#test-popover',
        ) as UUIPopoverContainerElement;
        const button = container.querySelector(
          '#trigger-button',
        ) as HTMLElement;

        button.click();
        await expect
          .poll(() => popover.style.opacity, { timeout: 5000 })
          .toBe('1');

        const target = button.getBoundingClientRect();
        const rect = popover.getBoundingClientRect();
        expect(rect.top).toBeCloseTo(target.bottom, 0);
        expect(rect.left).toBeLessThanOrEqual(target.right);
        expect(rect.right).toBeGreaterThanOrEqual(target.left);
      });
    }
  });

  describe('available height CSS custom property', () => {
    // Headless WebKit on Linux CI can take close to 2 s to position a popover, past the default 1 s poll.
    const positioned = { timeout: 5000 };

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
      await expect
        .poll(
          () => popover.style.getPropertyValue('--_available-height'),
          positioned,
        )
        .toMatch(/^\d+(\.\d+)?px$/);

      const numericValue = parseFloat(
        popover.style.getPropertyValue('--_available-height'),
      );
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

      const p1 = container.querySelector('#p1') as UUIPopoverContainerElement;
      const p2 = container.querySelector('#p2') as UUIPopoverContainerElement;

      (container.querySelector('#btn1') as HTMLElement).click();
      await expect
        .poll(
          () => p1.style.getPropertyValue('--_available-height'),
          positioned,
        )
        .toMatch(/px$/);
      const withoutMargin = parseFloat(
        p1.style.getPropertyValue('--_available-height'),
      );

      (container.querySelector('#btn2') as HTMLElement).click();
      await expect
        .poll(
          () => p2.style.getPropertyValue('--_available-height'),
          positioned,
        )
        .toMatch(/px$/);
      const withMargin = parseFloat(
        p2.style.getPropertyValue('--_available-height'),
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

      await expect
        .poll(() => {
          const scrollContainer = popover.shadowRoot?.querySelector(
            'uui-scroll-container',
          );
          return scrollContainer
            ? getComputedStyle(scrollContainer).maxHeight
            : '';
        }, positioned)
        .toMatch(/px$/);
    });
  });

  describe('focus restoration', () => {
    const roots = {
      'the light DOM': (tag?: string) => {
        const host = render(html`<div></div>`).container
          .firstElementChild as HTMLElement;
        host.innerHTML = popoverMarkup(tag);
        return host;
      },
      'a shadow root': () =>
        render(
          html`<popover-in-shadow-dom></popover-in-shadow-dom>`,
        ).container.querySelector('popover-in-shadow-dom')!.shadowRoot!,
    };

    const nextToggle = (popover: Element) =>
      new Promise(resolve =>
        popover.addEventListener('toggle', resolve, { once: true }),
      );

    // Opens the popover by keyboard and moves focus into it.
    async function openAndFocusInside(root: ParentNode) {
      const trigger = root.querySelector<HTMLElement>('#trigger')!;
      trigger.focus();
      await userEvent.keyboard('{Enter}');
      await expect
        .poll(() => root.querySelector('#popover')!.matches(':popover-open'))
        .toBe(true);
      root.querySelector<HTMLElement>('#inside')!.focus();
      return trigger;
    }

    for (const [where, mount] of Object.entries(roots)) {
      it(`returns focus to the trigger on Escape in ${where}`, async () => {
        const root = mount();
        const trigger = await openAndFocusInside(root);

        await userEvent.keyboard('{Escape}');

        await expect.poll(deepActiveElement).toBe(trigger);
      });

      it(`returns focus to the trigger on hidePopover() in ${where}`, async () => {
        const root = mount();
        const trigger = await openAndFocusInside(root);

        root.querySelector<HTMLElement>('#popover')!.hidePopover();

        await expect.poll(deepActiveElement).toBe(trigger);
      });
    }

    it('leaves focus alone when it was outside the popover at close', async () => {
      const root = roots['a shadow root']();
      await openAndFocusInside(root);
      const outside = root.querySelector<HTMLElement>('#outside')!;
      outside.focus();
      const popover = root.querySelector<HTMLElement>('#popover')!;

      const toggled = nextToggle(popover);
      popover.hidePopover();
      await toggled;

      expect(deepActiveElement()).toBe(outside);
    });

    it('does not restore focus for a manual popover', async () => {
      // Only auto popovers restore focus, per the spec.
      const root = roots['a shadow root']();
      const popover = root.querySelector<HTMLElement>('#popover')!;
      popover.popover = 'manual';
      const trigger = await openAndFocusInside(root);

      const toggled = nextToggle(popover);
      popover.hidePopover();
      await toggled;

      expect(deepActiveElement()).not.toBe(trigger);
    });

    it('does not restore focus after a click outside closes the popover', async () => {
      // Light dismiss never restores focus, per the spec.
      const root = roots['a shadow root']();
      await openAndFocusInside(root);
      const popover = root.querySelector<HTMLElement>('#popover')!;

      const toggled = nextToggle(popover);
      await userEvent.click(root.querySelector('#blank')!);
      await toggled;

      expect(deepActiveElement()).toBe(document.body);
    });

    it('restores focus from a nested popover only as a native popover would', async () => {
      // The platform only restores focus for the first popover in a stack.
      const focusAfterNestedEscape = async (root: ParentNode) => {
        await openAndFocusInside(root);
        root.querySelector<HTMLElement>('#nested-trigger')!.focus();
        await userEvent.keyboard('{Enter}');
        const nested = root.querySelector<HTMLElement>('#nested')!;
        await expect.poll(() => nested.matches(':popover-open')).toBe(true);
        root.querySelector<HTMLElement>('#nested-inside')!.focus();

        const toggled = nextToggle(nested);
        await userEvent.keyboard('{Escape}');
        await toggled;
        await new Promise(requestAnimationFrame);

        const active = deepActiveElement();
        root.querySelector<HTMLElement>('#popover')!.hidePopover();
        // WebKit can leave focus on the hidden element for a while before moving it to body: both mean nothing restored it.
        const notRestored =
          !active || active === document.body || nested.contains(active);
        return notRestored ? 'not restored' : active.id;
      };

      const native = await focusAfterNestedEscape(
        roots['the light DOM']('div'),
      );
      const inShadowRoot = await focusAfterNestedEscape(
        roots['a shadow root'](),
      );

      expect(inShadowRoot).toBe(native);
    });
  });
});

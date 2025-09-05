import { html, fixture, expect } from '@open-wc/testing';
import { UUIPopoverContainerElement } from '../packages/uui-popover-container/lib/uui-popover-container.element';
import '../packages/uui-button/lib';

// Custom element to simulate the shadow DOM scenario from the issue
class TestShadowContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `
      <style>
        .outer-scroll {
          height: 300px;
          width: 350px;
          overflow: auto;
          border: 2px solid red;
          padding: 10px;
        }
        .inner-scroll {
          height: 200px;
          width: 250px;
          overflow: auto;
          border: 2px solid blue;
          padding: 10px;
        }
        .spacer {
          height: 600px;
          background: linear-gradient(to bottom, #ccc, #eee);
        }
        .content {
          height: 300px;
          background: linear-gradient(to bottom, #aaf, #bbf);
        }
      </style>
      <div class="outer-scroll" id="outer-scroll">
        <div style="height: 100px;">Top spacer</div>
        <div class="inner-scroll" id="inner-scroll">
          <div style="height: 50px;">Inner top spacer</div>
          <uui-button id="test-button" popovertarget="test-popover">Open Popover</uui-button>
          <div class="content">Inner content area</div>
        </div>
        <div class="spacer">Outer content area</div>
      </div>
      <uui-popover-container id="test-popover" popover placement="bottom-start">
        <div style="background: white; padding: 20px; border: 1px solid black; border-radius: 4px;">
          <h3>Test Popover</h3>
          <p>This popover should track scrolling in both containers</p>
        </div>
      </uui-popover-container>
    `;
  }
}

customElements.define('test-shadow-container', TestShadowContainer);

describe('Shadow DOM Scroll Parent Detection', () => {
  it('should properly detect scroll parents in nested shadow DOM containers', async () => {
    const container = await fixture(
      html`<test-shadow-container></test-shadow-container>`,
    );

    const shadowRoot = container.shadowRoot!;
    const button = shadowRoot.querySelector('#test-button') as HTMLElement;
    const popover = shadowRoot.querySelector(
      '#test-popover',
    ) as UUIPopoverContainerElement;
    const outerScroll = shadowRoot.querySelector(
      '#outer-scroll',
    ) as HTMLElement;
    const innerScroll = shadowRoot.querySelector(
      '#inner-scroll',
    ) as HTMLElement;

    // Open the popover
    button.click();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Access the private scroll parents for testing
    const scrollParents = (popover as any)['#scrollParents'];

    // Should have detected both scroll containers plus document.body
    expect(scrollParents.length).to.be.greaterThan(2);

    // Should include both scroll containers
    expect(scrollParents).to.include(outerScroll);
    expect(scrollParents).to.include(innerScroll);

    // Should include document.body as the last element
    expect(scrollParents[scrollParents.length - 1]).to.equal(document.body);

    // Verify no duplicates when opening multiple times
    popover.hidePopover();
    await new Promise(resolve => setTimeout(resolve, 50));

    button.click();
    await new Promise(resolve => setTimeout(resolve, 100));

    const scrollParentsAfterReopen = (popover as any)['#scrollParents'];

    // Should not have duplicates
    const uniqueParents = [...new Set(scrollParentsAfterReopen)];
    expect(scrollParentsAfterReopen.length).to.equal(uniqueParents.length);
  });

  it('should handle scroll parent detection when elements are added/removed', async () => {
    const container = await fixture(
      html`<test-shadow-container></test-shadow-container>`,
    );

    const shadowRoot = container.shadowRoot!;
    const button = shadowRoot.querySelector('#test-button') as HTMLElement;
    const popover = shadowRoot.querySelector(
      '#test-popover',
    ) as UUIPopoverContainerElement;

    // Initial open
    button.click();
    await new Promise(resolve => setTimeout(resolve, 100));

    const initialScrollParents = (popover as any)['#scrollParents'];
    const initialCount = initialScrollParents.length;

    // Close and reopen
    popover.hidePopover();
    await new Promise(resolve => setTimeout(resolve, 50));

    button.click();
    await new Promise(resolve => setTimeout(resolve, 100));

    const newScrollParents = (popover as any)['#scrollParents'];

    // Should have the same number of scroll parents
    expect(newScrollParents.length).to.equal(initialCount);

    // Should be the same elements (no stale references)
    expect(newScrollParents[newScrollParents.length - 1]).to.equal(
      document.body,
    );
  });
});

import { expect, fixture, html, oneEvent, aTimeout } from '@open-wc/testing';

import { UUITabGroupElement } from './uui-tab-group.element';
import { UUITabElement } from './uui-tab.element';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-more/lib';

async function waitFor(expectation: () => void, timeout = 2000, interval = 50) {
  const endTime = Date.now() + timeout;
  while (Date.now() < endTime) {
    try {
      expectation();
      return;
    } catch (error) {
      await aTimeout(interval);
    }
  }
  throw new Error('waitFor: condition not met within timeout');
}

describe('UuiTab', () => {
  let element: UUITabGroupElement;
  let tabs: UUITabElement[];

  beforeEach(async () => {
    element = await fixture(html`
      <uui-tab-group>
        <uui-tab label="Content">Content</uui-tab>
        <uui-tab label="Packages">Packages</uui-tab>
        <uui-tab label="Media" active>Media</uui-tab>
      </uui-tab-group>
    `);

    tabs = Array.from(element.querySelectorAll('uui-tab'));
  });

  it('is defined as its own instance', () => {
    expect(element).to.be.instanceOf(UUITabGroupElement);
  });

  it('tab element defined as its own instance', () => {
    expect(tabs[0]).to.be.instanceOf(UUITabElement);
  });

  it('it selects an item', () => {
    tabs[1].click();
    expect(tabs[0].active).to.be.false;
    expect(tabs[1].active).to.be.true;
    expect(tabs[2].active).to.be.false;

    tabs[2].click();
    expect(tabs[0].active).to.be.false;
    expect(tabs[1].active).to.be.false;
    expect(tabs[2].active).to.be.true;
  });

  it('it emits a click event', async () => {
    const listener = oneEvent(element, 'click', false);
    tabs[0].click();
    const ev = await listener;
    expect(ev.type).to.equal('click');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('tab element passes the a11y audit', async () => {
    await expect(tabs[0]).shadowDom.to.be.accessible();
  });

  it('passes the a11y audit when tabs overflow the viewport', async () => {
    const overflowElement = await fixture(html`
      <uui-tab-group style="width: 200px;">
        <uui-tab label="Tab 1"></uui-tab>
        <uui-tab label="Tab 2"></uui-tab>
        <uui-tab label="Tab 3"></uui-tab>
        <uui-tab label="Tab 4"></uui-tab>
        <uui-tab label="Tab 5"></uui-tab>
      </uui-tab-group>
    `);

    await expect(overflowElement).shadowDom.to.be.accessible();
  });

  it('shows the "more tabs to the right" button when tabs overflow the viewport', async () => {
    const overflowElement = await fixture(html`
      <uui-tab-group style="width: 200px;">
        <uui-tab label="Tab 1"></uui-tab>
        <uui-tab label="Tab 2"></uui-tab>
        <uui-tab label="Tab 3"></uui-tab>
        <uui-tab label="Tab 4"></uui-tab>
        <uui-tab label="Tab 5"></uui-tab>
      </uui-tab-group>
    `);

    const scrollRightButton =
      overflowElement.shadowRoot!.getElementById('more-button-right')!;

    // Check if the "more tabs to the right" button is visible
    const buttonRect = scrollRightButton.getBoundingClientRect();
    const isVisible =
      buttonRect.width > 0 &&
      buttonRect.height > 0 &&
      buttonRect.top >= 0 &&
      buttonRect.left >= 0;

    expect(isVisible).to.be.true;
  });

  it('doesnt show the "more tabs to the right" button when tabs dont overflow the viewport', async () => {
    const overflowElement = await fixture(html`
      <uui-tab-group style="width: 500px;">
        <uui-tab label="Tab 1"></uui-tab>
        <uui-tab label="Tab 2"></uui-tab>
      </uui-tab-group>
    `);

    const scrollRightButton =
      overflowElement.shadowRoot!.getElementById('more-button-right')!;

    // Check if the "more tabs to the right" button is visible
    const buttonRect = scrollRightButton.getBoundingClientRect();
    const isVisible =
      buttonRect.width > 0 &&
      buttonRect.height > 0 &&
      buttonRect.top >= 0 &&
      buttonRect.left >= 0;

    expect(isVisible).to.be.false;
  });

  it('doesnt show the "more tabs to the left" button when we havent scrolled right', async () => {
    const overflowElement = await fixture(html`
      <uui-tab-group style="width: 200px;">
        <uui-tab label="Tab 1"></uui-tab>
        <uui-tab label="Tab 2"></uui-tab>
        <uui-tab label="Tab 3"></uui-tab>
        <uui-tab label="Tab 4"></uui-tab>
        <uui-tab label="Tab 5"></uui-tab>
      </uui-tab-group>
    `);

    const scrollLeftButton =
      overflowElement.shadowRoot!.getElementById('more-button-left')!;

    // Check if the "more tabs to the left" button is visible
    const buttonRect = scrollLeftButton.getBoundingClientRect();
    const isVisible =
      buttonRect.width > 0 &&
      buttonRect.height > 0 &&
      buttonRect.top >= 0 &&
      buttonRect.left >= 0;

    expect(isVisible).to.be.false;
  });

  it('does show the "more tabs to the left" button when we have scrolled right', async () => {
    const overflowElement = await fixture(html`
      <uui-tab-group style="width: 200px;">
        <uui-tab label="Tab 1"></uui-tab>
        <uui-tab label="Tab 2"></uui-tab>
        <uui-tab label="Tab 3"></uui-tab>
        <uui-tab label="Tab 4"></uui-tab>
        <uui-tab label="Tab 5"></uui-tab>
      </uui-tab-group>
    `);

    const grid = overflowElement.shadowRoot!.getElementById('grid')!;

    // Scroll to the right
    grid.scrollBy({ left: 100 });

    const scrollLeftButton =
      overflowElement.shadowRoot!.getElementById('more-button-left')!;

    // Wait for the "more tabs to the left" button to become visible
    await waitFor(() => {
      const buttonRect = scrollLeftButton.getBoundingClientRect();
      const isVisible =
        buttonRect.width > 0 &&
        buttonRect.height > 0 &&
        buttonRect.top >= 0 &&
        buttonRect.left >= 0;
      expect(isVisible).to.be.true;
    });
  });
});

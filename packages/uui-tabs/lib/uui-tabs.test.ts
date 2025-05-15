import { expect, fixture, html, oneEvent } from '@open-wc/testing';

import { UUITabGroupElement } from './uui-tab-group.element';
import { UUITabElement } from './uui-tab.element';
import { UUIPopOverContainer } from '@umbraco-ui/uui-popover-container/lib';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-more/lib';

describe('UuiTab', () => {
  let element: UUITabGroupElement;
  let tabs: UUITabElement[];
  let popoverContainer: UUIPopOverContainer;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-tab-group>
        <uui-tab label="Content">Content</uui-tab>
        <uui-tab label="Packages">Packages</uui-tab>
        <uui-tab label="Media" active>Media</uui-tab>
        <uui-tab label="Content1">Content to force a more button</uui-tab>
        <uui-tab label="Content2">Content to force a more button</uui-tab>
        <uui-tab label="Content3">Content to force a more button</uui-tab>
        <uui-tab label="Content4">Content to force a more button</uui-tab>
        <uui-tab label="Content5">Content to force a more button</uui-tab>
        <uui-tab label="Content6">Content to force a more button</uui-tab>
        <uui-tab label="Content7">Content to force a more button</uui-tab>
        <uui-tab label="Content8">Content to force a more button</uui-tab>
        <uui-tab label="Content9">Content to force a more button</uui-tab>
        <uui-tab label="Content10">Content to force a more button</uui-tab>
        <uui-tab label="Content11">Content to force a more button</uui-tab>
        <uui-tab label="Content12">Content to force a more button</uui-tab>
        <uui-tab label="Content13">Content to force a more button</uui-tab>
        <uui-tab label="Content14">Content to force a more button</uui-tab>
        <uui-tab label="Content15">Content to force a more button</uui-tab>
      </uui-tab-group>
    `);

    tabs = Array.from(element.querySelectorAll('uui-tab'));
    popoverContainer = element.shadowRoot?.querySelector(
      '#popover-container',
    ) as UUIPopOverContainer;
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

  it('focuses and activates next tab on ArrowRight', async () => {
    element.focus(); // Focus the tab group
    await element.updateComplete;

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event);
    await element.updateComplete;

    expect(tabs[2].active).to.be.false;
    expect(tabs[3].active).to.be.true;
  });

  it('focuses and activates previous tab on ArrowLeft', async () => {
    element.focus();
    await element.updateComplete;

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event);
    await element.updateComplete;

    expect(tabs[1].active).to.be.true;
    expect(tabs[2].active).to.be.false;
  });

  it('focuses and activates first tab on Home', async () => {
    element.focus();
    await element.updateComplete;

    const event = new KeyboardEvent('keydown', {
      key: 'Home',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event);
    await element.updateComplete;

    expect(tabs[0].active).to.be.true;
    expect(tabs[2].active).to.be.false;
  });

  it('focuses and activates last tab on End', async () => {
    element.focus();
    await element.updateComplete;

    const event = new KeyboardEvent('keydown', {
      key: 'End',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event);
    await element.updateComplete;

    expect(tabs[2].active).to.be.false;
    expect(tabs[17].active).to.be.true;
  });

  it('wraps focus from last to first tab with ArrowRight', async () => {
    element.focus();
    await element.updateComplete;

    // Set focus to last tab
    const event = new KeyboardEvent('keydown', {
      key: 'End',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event);
    await element.updateComplete;

    const event2 = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event2);
    await element.updateComplete;

    expect(tabs[0].active).to.be.true;
    expect(tabs[17].active).to.be.false;
  });

  it('wraps focus from first to last tab with ArrowLeft and popmenu appears', async () => {
    element.focus();
    await element.updateComplete;

    const event = new KeyboardEvent('keydown', {
      key: 'Home',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event);
    await element.updateComplete;

    // Check we loop round and the popover appears
    const event2 = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event2);
    await element.updateComplete;

    expect(tabs[0].active).to.be.false;
    expect(tabs[17].active).to.be.true;
    expect(popoverContainer.open).to.be.true;

    // Check the popup is hidden when the ArrowRight key is pressed
    const event3 = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      composed: true,
    });

    element.dispatchEvent(event3);
    await element.updateComplete;

    expect(tabs[0].active).to.be.true;
    expect(tabs[17].active).to.be.false;
    expect(popoverContainer.open).to.be.false;
  });
});

import { expect, fixture, html, oneEvent } from '@open-wc/testing';

import { UUITabGroupElement } from './uui-tab-group.element';
import { UUITabElement } from './uui-tab.element';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-more/lib';

describe('UuiTab', () => {
  let element: UUITabGroupElement;
  let tabs: UUITabElement[];

  beforeEach(async () => {
    element = await fixture(html`
      <uui-tab-group>
        <uui-tab label="Content" href="#content">Content</uui-tab>
        <uui-tab label="Packages" href="#packages">Packages</uui-tab>
        <uui-tab label="Media" active href="#media">Media</uui-tab>
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
    const listener = oneEvent(element, 'click');
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

    expect(tabs[2].hasFocus()).to.be.false;
    expect(tabs[3].hasFocus()).to.be.true;
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

    expect(tabs[1].hasFocus()).to.be.true;
    expect(tabs[2].hasFocus()).to.be.false;
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

    expect(tabs[0].hasFocus()).to.be.true;
    expect(tabs[2].hasFocus()).to.be.false;
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

    expect(tabs[2].hasFocus()).to.be.false;
    expect(tabs[17].hasFocus()).to.be.true;
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

    expect(tabs[0].hasFocus()).to.be.true;
    expect(tabs[17].hasFocus()).to.be.false;
  });

  it('activates the focused tab on Space or Enter', async () => {
    element.focus();
    await element.updateComplete;

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft', // Move focus to the second tab
      bubbles: true,
      composed: true,
    });
    element.dispatchEvent(event);
    await element.updateComplete;

    const spaceEvent = new KeyboardEvent('keydown', {
      key: ' ', // Simulate Space key press
      bubbles: true,
      composed: true,
    });
    element.dispatchEvent(spaceEvent);
    await element.updateComplete;

    await new Promise<void>(resolve => {
      const hashChangeListener = () => {
        if (window.location.hash === '#packages') {
          window.removeEventListener('hashchange', hashChangeListener);
          resolve();
        }
      };
      window.addEventListener('hashchange', hashChangeListener);
    });

    expect(tabs[0].active).to.be.false;
    expect(tabs[1].active).to.be.true;
    expect(window.location.hash).to.equal('#packages');

    const arrowLeftEvent = new KeyboardEvent('keydown', {
      // Move focus to the first tab
      key: 'ArrowLeft',
      bubbles: true,
      composed: true,
    });
    element.dispatchEvent(arrowLeftEvent);
    await element.updateComplete;

    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter', // Simulate Enter key press
      bubbles: true,
      composed: true,
    });
    element.dispatchEvent(enterEvent);
    await element.updateComplete;

    await new Promise<void>(resolve => {
      const hashChangeListener = () => {
        if (window.location.hash === '#content') {
          window.removeEventListener('hashchange', hashChangeListener);
          resolve();
        }
      };
      window.addEventListener('hashchange', hashChangeListener);
    });

    expect(tabs[0].active).to.be.true;
    expect(tabs[1].active).to.be.false;
    expect(window.location.hash).to.equal('#content');
  });
});

import './tabs.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

import { UUITabGroupElement } from './tab-group.element';
import { UUITabElement } from './tab.element';

import '../button/button.js';
import '../popover-container/popover-container.js';
import '../symbol-more/symbol-more.js';

describe('UuiTab', () => {
  let element: UUITabGroupElement;
  let tabs: UUITabElement[];

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
  });

  it('is defined as its own instance', () => {
    expect(element).to.be.instanceOf(UUITabGroupElement);
  });

  it('tab element defined as its own instance', () => {
    expect(tabs[0]).to.be.instanceOf(UUITabElement);
  });

  it('it selects an item', () => {
    tabs[1].click();
    expect(tabs[0].active).to.equal(false);
    expect(tabs[1].active).to.equal(true);
    expect(tabs[2].active).to.equal(false);

    tabs[2].click();
    expect(tabs[0].active).to.equal(false);
    expect(tabs[1].active).to.equal(false);
    expect(tabs[2].active).to.equal(true);
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
});

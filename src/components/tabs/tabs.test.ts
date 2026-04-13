import './tabs.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';

import { UUITabGroupElement } from './tab-group.element';
import { UUITabElement } from './tab.element';

import '../button/button.js';
import '../popover-container/popover-container.js';
import '../symbol-more/symbol-more.js';

describe('UuiTab', () => {
  let element: UUITabGroupElement;
  let tabs: UUITabElement[];

  beforeEach(async () => {
    element = render(html`
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
    `).container.querySelector('uui-tab-group')!;

    await element.updateComplete;

    tabs = Array.from(element.querySelectorAll('uui-tab'));
  });

  it('is defined as its own instance', () => {
    expect(element).toBeInstanceOf(UUITabGroupElement);
  });

  it('tab element defined as its own instance', () => {
    expect(tabs[0]).toBeInstanceOf(UUITabElement);
  });

  it('it selects an item', () => {
    tabs[1].click();
    expect(tabs[0].active).toBe(false);
    expect(tabs[1].active).toBe(true);
    expect(tabs[2].active).toBe(false);

    tabs[2].click();
    expect(tabs[0].active).toBe(false);
    expect(tabs[1].active).toBe(false);
    expect(tabs[2].active).toBe(true);
  });

  it('it emits a click event', async () => {
    const listener = oneEvent(element, 'click');
    tabs[0].click();
    const ev = await listener;
    expect(ev.type).toBe('click');
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('tab element passes the a11y audit', async () => {
    expect(await axeRun(tabs[0])).toHaveNoViolations();
  });
});

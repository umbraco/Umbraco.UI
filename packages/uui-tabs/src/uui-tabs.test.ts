import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { UUITabGroupElement } from './uui-tab-group.element';
import { UUITabElement } from './uui-tab.element';
import './index';

describe('UuiTab', () => {
  let element: UUITabGroupElement;
  let tabs: UUITabElement[];

  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-tab-group>
          <uui-tab label="Content">Content</uui-tab>
          <uui-tab label="Packages">Packages</uui-tab>
          <uui-tab label="Media" active>Media</uui-tab>
        </uui-tab-group>
      `
    );

    tabs = Array.from(element.querySelectorAll('uui-tab'));
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
});

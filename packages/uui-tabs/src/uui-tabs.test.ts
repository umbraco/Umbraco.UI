import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUITabGroupElement } from './uui-tab-group.element';

import './index';
import { UUITabElement } from './uui-tab.element';

describe('UuiTab', () => {
  let tabs: UUITabGroupElement;
  beforeEach(async () => {
    tabs = await fixture(
      html`
        <uui-tab-group>
          <uui-tab> Content </uui-tab>
          <uui-tab> Packages </uui-tab>
          <uui-tab active> Media </uui-tab>
        </uui-tab-group>
      `
    );
  });

  it('passes the a11y audit', () => {
    expect(tabs).shadowDom.to.be.accessible();
  });

  //   it('changes the active element after click', () => {
  //     const slot = tabs.shadowRoot!.querySelector('slot');
  //     const tabsArray = slot!.assignedNodes({
  //       flatten: false,
  //     }) as UUITabElement[];
  //     tabsArray[0].click();
  //     expect(tabsArray[0].hasAttribute('active')).to.be.true;
  //   });
});

describe('UuiTabElement', () => {
  let tab: UUITabGroupElement;
  beforeEach(async () => {
    tab = await fixture(html`<uui-tab> Content </uui-tab>`);
  });

  it('passes the a11y audit', () => {
    expect(tab).shadowDom.to.be.accessible();
  });
});

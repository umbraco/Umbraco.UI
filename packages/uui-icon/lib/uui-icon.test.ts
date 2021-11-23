import { html, fixture, expect } from '@open-wc/testing';
import { UUIIconElement } from './uui-icon.element';
import '.';

import { iconRegistry } from './UUIIconRegistry';

describe('UUIIconElement', () => {
  const TEST_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"></svg>';
  let element: UUIIconElement;

  beforeEach(async () => {
    iconRegistry.defineIcon('test', TEST_SVG);
    element = await fixture(html` <uui-icon name="test"></uui-icon> `);
  });

  it('contains svg of icon', async () => {
    await expect(element).shadowDom.to.equal(TEST_SVG);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

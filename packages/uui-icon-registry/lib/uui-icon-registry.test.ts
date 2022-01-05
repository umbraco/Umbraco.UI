import { html, fixture, expect } from '@open-wc/testing';
import { UUIIconRegistryElement } from './uui-icon-registry.element';
import '.';

describe('UUIIconRegistryElement', () => {
  let element: UUIIconRegistryElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-icon-registry></uui-icon-registry> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

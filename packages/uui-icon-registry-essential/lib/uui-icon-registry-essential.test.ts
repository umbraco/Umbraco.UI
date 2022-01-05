import { html, fixture, expect } from '@open-wc/testing';
import { UUIIconRegistryEssentialElement } from './uui-icon-registry-essential.element';
import '.';

describe('UUIIconRegistryEssentialElement', () => {
  let element: UUIIconRegistryEssentialElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-icon-registry-essential></uui-icon-registry-essential> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

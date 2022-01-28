import '../define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUIIconRegistryEssentialElement } from './uui-icon-registry-essential.element';

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

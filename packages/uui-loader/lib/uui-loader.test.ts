import '../define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUILoaderElement } from './uui-loader.element';

describe('UuiLoader', () => {
  let element: UUILoaderElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-loader></uui-loader> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

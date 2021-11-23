import { html, fixture, expect } from '@open-wc/testing';
import { UUIListElement } from './uui-list.element';
import '.';

describe('UUIListElement', () => {
  let element: UUIListElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-list></uui-list> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

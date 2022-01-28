import { html, fixture, expect } from '@open-wc/testing';
import { UUICardElement } from './uui-card.element';
import '.';

describe('UUICardElement', () => {
  let element: UUICardElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-card></uui-card> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

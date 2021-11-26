import { html, fixture, expect } from '@open-wc/testing';
import { UUIRefElement } from './uui-ref.element';
import '.';

describe('UUIRefElement', () => {
  let element: UUIRefElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-ref></uui-ref> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

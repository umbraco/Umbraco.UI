import { html, fixture, expect } from '@open-wc/testing';
import { UUIPaginationElement } from './uui-pagination.element';
import '.';

describe('UUIPaginationElement', () => {
  let element: UUIPaginationElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-pagination></uui-pagination> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

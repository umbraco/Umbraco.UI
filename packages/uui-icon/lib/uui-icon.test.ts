import { html, fixture, expect } from '@open-wc/testing';
import { UUIIconElement } from './uui-icon.element';
import '.';

describe('UUIIconElement', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-icon></uui-icon> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

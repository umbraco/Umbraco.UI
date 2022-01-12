import { html, fixture, expect } from '@open-wc/testing';
import { UUILabelElement } from './uui-label.element';
import '.';

describe('UUILabelElement', () => {
  let element: UUILabelElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-label></uui-label> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

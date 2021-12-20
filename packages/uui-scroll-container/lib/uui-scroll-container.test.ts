import { html, fixture, expect } from '@open-wc/testing';
import { UUIScrollContainerElement } from './uui-scroll-container.element';
import '.';

describe('UUIScrollContainerElement', () => {
  let element: UUIScrollContainerElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-scroll-container></uui-scroll-container> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

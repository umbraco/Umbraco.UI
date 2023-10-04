import { html, fixture, expect } from '@open-wc/testing';
import { UUIResizeObserverElement } from './uui-resize-observer.element';

describe('UUIResizeObserverElement', () => {
  let element: UUIResizeObserverElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-resize-observer></uui-resize-observer> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIResizeObserverElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
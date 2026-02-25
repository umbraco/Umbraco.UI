import './visually-hidden.js';
import { html, fixture, expect } from '@open-wc/testing';
import { UUIVisuallyHiddenElement } from './visually-hidden.element';

describe('UUIVisuallyHiddenElement', () => {
  let element: UUIVisuallyHiddenElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-visually-hidden></uui-visually-hidden>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIVisuallyHiddenElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

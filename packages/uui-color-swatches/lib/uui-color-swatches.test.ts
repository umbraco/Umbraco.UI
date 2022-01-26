import { html, fixture, expect } from '@open-wc/testing';
import { UUIColorSwatchesElement } from './uui-color-swatches.element';
import '.';

describe('UUIColorSwatchesElement', () => {
  let element: UUIColorSwatchesElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-color-swatches></uui-color-swatches> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
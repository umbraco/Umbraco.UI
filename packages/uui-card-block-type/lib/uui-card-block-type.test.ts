import { html, fixture, expect } from '@open-wc/testing';
import { UUICardBlockTypeElement } from './uui-card-block-type.element';

describe('UUICardBlockTypeElement', () => {
  let element: UUICardBlockTypeElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-card-block-type></uui-card-block-type> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUICardBlockTypeElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

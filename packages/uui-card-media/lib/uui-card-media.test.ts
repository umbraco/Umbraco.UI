import { html, fixture, expect } from '@open-wc/testing';
import { UUICardMediaElement } from './uui-card-media.element';
import '.';

describe('UUICardMediaElement', () => {
  let element: UUICardMediaElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-card-media></uui-card-media> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
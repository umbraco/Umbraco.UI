import { html, fixture, expect } from '@open-wc/testing';
import { UUICardContentNodeElement } from './uui-card-content-node.element';
import '.';

describe('UUICardContentNodeElement', () => {
  let element: UUICardContentNodeElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-card-content-node></uui-card-content-node> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
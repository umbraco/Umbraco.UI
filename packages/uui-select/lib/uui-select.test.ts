import { html, fixture, expect } from '@open-wc/testing';
import { UUISelectElement } from './uui-select.element';
import '.';

describe('UUISelectElement', () => {
  let element: UUISelectElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-select></uui-select> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
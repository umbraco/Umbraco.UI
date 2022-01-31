import { html, fixture, expect } from '@open-wc/testing';
import { UUIFormElement } from './uui-form.element';
import '.';

describe('UUIFormElement', () => {
  let element: UUIFormElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-form></uui-form> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

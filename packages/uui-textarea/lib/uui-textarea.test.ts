import { html, fixture, expect } from '@open-wc/testing';
import { UUITextareaElement } from './uui-textarea.element';
import '.';

describe('UUITextareaElement', () => {
  let element: UUITextareaElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-textarea></uui-textarea> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
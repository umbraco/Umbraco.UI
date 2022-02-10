import { html, fixture, expect } from '@open-wc/testing';
import { UUIFormValidationMessageElement } from './uui-form-validation-message.element';
import '.';

describe('UUIFormValidationMessageElement', () => {
  let element: UUIFormValidationMessageElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-form-validation-message></uui-form-validation-message> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIFormValidationMessageElement);
  });

  // Use of slot.
  // Use custom scope.
});

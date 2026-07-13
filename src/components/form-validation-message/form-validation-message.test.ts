import './form-validation-message.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import '../input/input.js';

import { UUIInputElement } from '../input/input.js';

import { UUIFormValidationMessageElement } from './form-validation-message.element';

describe('UUIFormValidationMessageElement', () => {
  let element: UUIFormValidationMessageElement;

  beforeEach(async () => {
    element = render(
      html` <uui-form-validation-message></uui-form-validation-message>`,
    ).container.querySelector('uui-form-validation-message')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIFormValidationMessageElement);
  });

  describe('properties', () => {
    it('has a for property', () => {
      expect(element).toHaveProperty('for');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot:not([name])')!;
      expect(slot).not.toBe(null);
    });

    it('renders an message slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=message]')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('Using slot', () => {
    let element: HTMLFormElement;
    let validationEl: UUIFormValidationMessageElement;
    let input: UUIInputElement;

    beforeEach(async () => {
      element = render(html`
        <form>
          <uui-form-validation-message>
            <uui-input
              label="Label"
              required
              required-message="MyRequiredMessage"></uui-input>
          </uui-form-validation-message>
        </form>
      `).container.querySelector('form')!;
      await element.updateComplete;
      validationEl = element.querySelector(
        'uui-form-validation-message',
      ) as UUIFormValidationMessageElement;
      input = validationEl.querySelector('uui-input') as UUIInputElement;
    });

    it('shows the validation message from FormControlMixin-element', async () => {
      input.pristine = false;
      input.checkValidity();

      await input.updateComplete;
      await validationEl.updateComplete;

      const messagesCon = validationEl.shadowRoot!.querySelector('#messages')!;

      const regex = /MyRequiredMessage/;
      expect(regex.test(messagesCon.innerHTML)).toBe(true);
    });

    it('clears the validation message when the form is reset', async () => {
      input.pristine = false;
      input.checkValidity();
      await input.updateComplete;
      await validationEl.updateComplete;

      const messagesCon = validationEl.shadowRoot!.querySelector('#messages')!;
      expect(/MyRequiredMessage/.test(messagesCon.innerHTML)).toBe(true);

      element.reset();
      await input.updateComplete;
      // Wait a tick for the MutationObserver to deliver the pristine attribute change.
      await new Promise(resolve => setTimeout(resolve, 0));
      await validationEl.updateComplete;

      expect(input.pristine).toBe(true);
      expect(/MyRequiredMessage/.test(messagesCon.innerHTML)).toBe(false);
    });

    it('clears the validation message when the control is set back to pristine', async () => {
      input.pristine = false;
      input.checkValidity();
      await input.updateComplete;
      await validationEl.updateComplete;

      const messagesCon = validationEl.shadowRoot!.querySelector('#messages')!;
      expect(/MyRequiredMessage/.test(messagesCon.innerHTML)).toBe(true);

      input.pristine = true;
      await input.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 0));
      await validationEl.updateComplete;

      expect(/MyRequiredMessage/.test(messagesCon.innerHTML)).toBe(false);
    });
  });

  describe('Using for property', () => {
    let element: HTMLFormElement;
    let validationEl: UUIFormValidationMessageElement;
    let input: UUIInputElement;

    beforeEach(async () => {
      element = render(html`
        <form>
          <div id="MyMessageScope">
            <uui-input
              label="Label"
              required
              required-message="MyRequiredMessage"></uui-input>
          </div>
          <uui-form-validation-message for="MyMessageScope">
          </uui-form-validation-message>
        </form>
      `).container.querySelector('form')!;
      await element.updateComplete;
      validationEl = element.querySelector(
        'uui-form-validation-message',
      ) as UUIFormValidationMessageElement;
      input = element.querySelector('uui-input') as UUIInputElement;
    });

    it('shows require message', async () => {
      input.pristine = false;
      input.checkValidity();

      await input.updateComplete;
      await validationEl.updateComplete;

      const messagesCon = validationEl.shadowRoot!.querySelector('#messages')!;
      const regex = /MyRequiredMessage/;

      expect(regex.test(messagesCon.innerHTML)).toBe(true);
    });
  });
});

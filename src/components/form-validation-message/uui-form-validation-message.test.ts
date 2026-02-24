import '../input/index.js';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { UUIInputElement } from '../input/uui-input.element.js';

import { UUIFormValidationMessageElement } from './uui-form-validation-message.element';

describe('UUIFormValidationMessageElement', () => {
  let element: UUIFormValidationMessageElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-form-validation-message></uui-form-validation-message>`,
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIFormValidationMessageElement);
  });

  describe('properties', () => {
    it('has a for property', () => {
      expect(element).to.have.property('for');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot:not([name])')!;
      expect(slot).to.exist;
    });

    it('renders an message slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=message]')!;
      expect(slot).to.exist;
    });
  });

  describe('Using slot', () => {
    let element: HTMLFormElement;
    let validationEl: UUIFormValidationMessageElement;
    let input: UUIInputElement;

    beforeEach(async () => {
      element = await fixture(html`
        <form>
          <uui-form-validation-message>
            <uui-input
              label="Label"
              required
              required-message="MyRequiredMessage"></uui-input>
          </uui-form-validation-message>
        </form>
      `);
      await elementUpdated(element);
      validationEl = element.querySelector(
        'uui-form-validation-message',
      ) as UUIFormValidationMessageElement;
      input = validationEl.querySelector('uui-input') as UUIInputElement;
    });

    it('shows the validation message from FormControlMixin-element', async () => {
      input.pristine = false;
      input.checkValidity();

      await elementUpdated(input);
      await elementUpdated(validationEl);

      const messagesCon = validationEl.shadowRoot!.querySelector('#messages')!;

      describe('Using for property', () => {
        let element: HTMLFormElement;
        let validationEl: UUIFormValidationMessageElement;
        let input: UUIInputElement;

        beforeEach(async () => {
          element = await fixture(html`
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
          `);
          await elementUpdated(element);
          validationEl = element.querySelector(
            'uui-form-validation-message',
          ) as UUIFormValidationMessageElement;
          input = element.querySelector('uui-input') as UUIInputElement;
        });

        it('shows require message', async () => {
          input.pristine = false;
          input.checkValidity();

          await elementUpdated(input);
          await elementUpdated(validationEl);

          const messagesCon =
            validationEl.shadowRoot!.querySelector('#messages')!;
          const regex = /MyRequiredMessage/;

          expect(regex.test(messagesCon.innerHTML)).to.be.true;
        });
      });

      const regex = /MyRequiredMessage/;
      expect(regex.test(messagesCon.innerHTML)).to.be.true;
    });
  });
});

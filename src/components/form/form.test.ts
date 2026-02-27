import './form.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { UUIFormElement } from './form.element';

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

describe('UUIFormElement', () => {
  let element: UUIFormElement;
  let formElement: HTMLFormElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-form><form @submit=${preventSubmit}></form></uui-form>`,
    );
    formElement = element.getFormElement()!;
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIFormElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('set novalidate attribute on form-element', async () => {
    await expect(formElement.hasAttribute('novalidate')).to.equal(true);
    await expect(formElement.getAttribute('novalidate')).to.not.equal(null);
    await expect(formElement.getAttribute('novalidate')).to.equal('');
  });

  describe('events', () => {
    describe('submit', () => {
      it('emits a submit event when submitted', async () => {
        const listener = oneEvent(formElement, 'submit', false);

        formElement.requestSubmit();

        const event = await listener;
        expect(event).to.not.equal(null);
        expect(event.type).to.equal('submit');
        expect(event!.target).to.equal(formElement);
      });
    });
  });

  describe('Validation', () => {
    let element: UUIFormElement;
    let formElement: HTMLFormElement;
    let input: HTMLInputElement;

    beforeEach(async () => {
      element = await fixture(html`
        <uui-form>
          <form @submit=${preventSubmit}>
            <input type="text" name="my_required_input" required />
          </form>
        </uui-form>
      `);
      formElement = element.getFormElement()!;
      input = element.querySelector('input') as HTMLInputElement;
    });

    it('does not have "submit-invalid" attribute before submission.', async () => {
      await expect(formElement.hasAttribute('submit-invalid')).to.equal(false);
    });

    it('has "submit-invalid" attribute if Form Control was invalid at submission.', async () => {
      const listener = oneEvent(formElement, 'submit', false);

      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).to.equal(true);
      await expect(formElement.getAttribute('submit-invalid')).to.not.equal(
        null,
      );
      await expect(formElement.getAttribute('submit-invalid')).to.equal('');
    });

    it('only has "submit-invalid" attribute if Form Control was invalid at submission.', async () => {
      const listener = oneEvent(formElement, 'submit', false);

      input.value = 'something';
      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).to.equal(false);
    });

    it('"submit-invalid" attribute is removed when form is re-validated and submitted.', async () => {
      const listener = oneEvent(formElement, 'submit', false);

      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).to.equal(true);

      const listener2 = oneEvent(formElement, 'submit', false);
      input.value = 'something';
      formElement.requestSubmit();

      await listener2;
      await expect(formElement.hasAttribute('submit-invalid')).to.equal(false);
    });
  });
});

export {};

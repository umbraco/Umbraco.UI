import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { UUIFormElement } from './uui-form.element';

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
    await expect(formElement.hasAttribute('novalidate')).to.be.true;
    await expect(formElement.getAttribute('novalidate')).to.not.be.null;
    await expect(formElement.getAttribute('novalidate')).to.be.empty;
  });

  describe('events', () => {
    describe('submit', () => {
      it('emits a submit event when submitted', async () => {
        const listener = oneEvent(formElement, 'submit', false);

        formElement.requestSubmit();

        const event = await listener;
        expect(event).to.exist;
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
      await expect(formElement.hasAttribute('submit-invalid')).to.be.false;
    });

    it('has "submit-invalid" attribute if Form Control was invalid at submission.', async () => {
      const listener = oneEvent(formElement, 'submit', false);

      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).to.be.true;
      await expect(formElement.getAttribute('submit-invalid')).to.not.be.null;
      await expect(formElement.getAttribute('submit-invalid')).to.be.empty;
    });

    it('only has "submit-invalid" attribute if Form Control was invalid at submission.', async () => {
      const listener = oneEvent(formElement, 'submit', false);

      input.value = 'something';
      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).to.be.false;
    });

    it('"submit-invalid" attribute is removed when form is re-validated and submitted.', async () => {
      const listener = oneEvent(formElement, 'submit', false);

      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).to.be.true;

      const listener2 = oneEvent(formElement, 'submit', false);
      input.value = 'something';
      formElement.requestSubmit();

      await listener2;
      await expect(formElement.hasAttribute('submit-invalid')).to.be.false;
    });
  });
});

export {};

import { expect, fixture, html, oneEvent } from '@open-wc/testing';

import { UUIFormElement } from './uui-form.element';

describe('UUIFormElement', () => {
  let element: UUIFormElement;

  beforeEach(async () => {
    element = await fixture(html` <form is="uui-form"></form> `);
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIFormElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('set novalidate attribute on form-element', async () => {
    await expect(element.hasAttribute('novalidate')).to.be.true;
    await expect(element.getAttribute('novalidate')).to.not.be.null;
    await expect(element.getAttribute('novalidate')).to.be.empty;
  });

  describe('events', () => {
    describe('submit', () => {
      it('emits a submit event when submitted', async () => {
        const listener = oneEvent(element, 'submit');

        element.requestSubmit();

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('submit');
        expect(event!.target).to.equal(element);
      });
    });
  });

  describe('Validation', () => {
    let element: UUIFormElement;
    let input: HTMLInputElement;

    beforeEach(async () => {
      element = await fixture(html`
        <form is="uui-form">
          <input type="text" name="my_required_input" required />
        </form>
      `);
      input = element.querySelector('input') as HTMLInputElement;
    });

    it('does not have "submit-invalid" attribute before submission.', async () => {
      await expect(element.hasAttribute('submit-invalid')).to.be.false;
    });

    it('has "submit-invalid" attribute if Form Control was invalid at submission.', async () => {
      const listener = oneEvent(element, 'submit');

      element.requestSubmit();

      await listener;
      await expect(element.hasAttribute('submit-invalid')).to.be.true;
      await expect(element.getAttribute('submit-invalid')).to.not.be.null;
      await expect(element.getAttribute('submit-invalid')).to.be.empty;
    });

    it('only has "submit-invalid" attribute if Form Control was invalid at submission.', async () => {
      const listener = oneEvent(element, 'submit');

      input.value = 'something';
      element.requestSubmit();

      await listener;
      await expect(element.hasAttribute('submit-invalid')).to.be.false;
    });

    it('"submit-invalid" attribute is removed when form is re-validated and submitted.', async () => {
      const listener = oneEvent(element, 'submit');

      element.requestSubmit();

      await listener;
      await expect(element.hasAttribute('submit-invalid')).to.be.true;

      const listener2 = oneEvent(element, 'submit');
      input.value = 'something';
      element.requestSubmit();

      await listener2;
      await expect(element.hasAttribute('submit-invalid')).to.be.false;
    });
  });
});

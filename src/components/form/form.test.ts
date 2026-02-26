import './form.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIFormElement } from './form.element';

/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

describe('UUIFormElement', () => {
  let element: UUIFormElement;
  let formElement: HTMLFormElement;

  beforeEach(async () => {
    element = render(html`<uui-form><form @submit=${preventSubmit}></form></uui-form>`).container.querySelector('uui-form')!;

    await element.updateComplete;
    formElement = element.getFormElement()!;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIFormElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('set novalidate attribute on form-element', async () => {
    await expect(formElement.hasAttribute('novalidate')).toBe(true);
    await expect(formElement.getAttribute('novalidate')).not.toBe(null);
    await expect(formElement.getAttribute('novalidate')).toBe('');
  });

  describe('events', () => {
    describe('submit', () => {
      it('emits a submit event when submitted', async () => {
        const listener = oneEvent(formElement, 'submit');

        formElement.requestSubmit();

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('submit');
        expect(event!.target).toBe(formElement);
      });
    });
  });

  describe('Validation', () => {
    let element: UUIFormElement;
    let formElement: HTMLFormElement;
    let input: HTMLInputElement;

    beforeEach(async () => {
      element = render(html`
        <uui-form>
          <form @submit=${preventSubmit}>
            <input type="text" name="my_required_input" required />
          </form>
        </uui-form>
      `).container.querySelector('uui-form')!;

      await element.updateComplete;
      formElement = element.getFormElement()!;
      input = element.querySelector('input') as HTMLInputElement;
    });

    it('does not have "submit-invalid" attribute before submission.', async () => {
      await expect(formElement.hasAttribute('submit-invalid')).toBe(false);
    });

    it('has "submit-invalid" attribute if Form Control was invalid at submission.', async () => {
      const listener = oneEvent(formElement, 'submit');

      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).toBe(true);
      await expect(formElement.getAttribute('submit-invalid')).not.toBe(null);
      await expect(formElement.getAttribute('submit-invalid')).toBe('');
    });

    it('only has "submit-invalid" attribute if Form Control was invalid at submission.', async () => {
      const listener = oneEvent(formElement, 'submit');

      input.value = 'something';
      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).toBe(false);
    });

    it('"submit-invalid" attribute is removed when form is re-validated and submitted.', async () => {
      const listener = oneEvent(formElement, 'submit');

      formElement.requestSubmit();

      await listener;
      await expect(formElement.hasAttribute('submit-invalid')).toBe(true);

      const listener2 = oneEvent(formElement, 'submit');
      input.value = 'something';
      formElement.requestSubmit();

      await listener2;
      await expect(formElement.hasAttribute('submit-invalid')).toBe(false);
    });
  });
});

export {};

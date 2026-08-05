import { render } from 'vitest-browser-lit';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
/* eslint-disable lit/no-invalid-html */
/* eslint-disable lit/binding-positions */
import { html, LitElement } from 'lit';

import { UUIFormControlEvent } from '../events/index.js';
import {
  UUIFormControlBaseMixin,
  UUIFormControlMixin,
  UUIFormControlWithBasicsMixin,
} from './index.js';

let __defineCECounter = 0;
function defineCE(klass: CustomElementConstructor): string {
  const name = `test-${__defineCECounter++}-${Date.now()}`;
  customElements.define(name, klass);
  return name;
}

const tagName = defineCE(
  class FormControlMixinTestElement extends UUIFormControlMixin(
    LitElement,
    '',
  ) {
    protected getFormElement() {
      return undefined;
    }

    render() {
      return html`<slot></slot>`;
    }
  },
);

const tag = unsafeStatic(tagName);

describe('UUIFormControlMixin', () => {
  it('is the same mixin as UUIFormControlWithBasicsMixin', () => {
    expect(UUIFormControlMixin).toBe(UUIFormControlWithBasicsMixin);
    expect(UUIFormControlMixin).not.toBe(UUIFormControlBaseMixin);
  });

  describe('element with v1 surface', () => {
    let element: any;

    beforeEach(async () => {
      element = render(staticHtml`<${tag}></${tag}>`).container.querySelector(
        tagName,
      )!;
      await element.updateComplete;
    });

    it('has the v1 basics properties with their defaults', () => {
      expect(element.name).toBe('');
      expect(element.required).toBe(false);
      expect(element.requiredMessage).toBe('This field is required');
      expect(element.error).toBe(false);
      expect(element.errorMessage).toBe('This field is invalid');
      expect(element.submit).toBeInstanceOf(Function);
    });

    it('flags valueMissing when required and empty', async () => {
      element.required = true;
      await element.updateComplete;

      expect(element.checkValidity()).toBe(false);
      expect(element.validity.valueMissing).toBe(true);
      expect(element.validationMessage).toBe('This field is required');

      element.value = 'no longer empty';
      await element.updateComplete;

      expect(element.checkValidity()).toBe(true);
    });

    it('flags customError when error is set', async () => {
      element.error = true;
      await element.updateComplete;

      expect(element.checkValidity()).toBe(false);
      expect(element.validity.customError).toBe(true);
      expect(element.validationMessage).toBe('This field is invalid');
    });
  });

  describe('validation event dispatching', () => {
    let element: any;
    let validCount: number;
    let invalidCount: number;

    beforeEach(async () => {
      element = render(staticHtml`<${tag}></${tag}>`).container.querySelector(
        tagName,
      )!;
      await element.updateComplete;
      validCount = 0;
      invalidCount = 0;
      // Filter on UUIFormControlEvent as ElementInternals.checkValidity() dispatches a native 'invalid' event with the same name.
      element.addEventListener(UUIFormControlEvent.VALID, (e: Event) => {
        if (e instanceof UUIFormControlEvent) validCount++;
      });
      element.addEventListener(UUIFormControlEvent.INVALID, (e: Event) => {
        if (e instanceof UUIFormControlEvent) invalidCount++;
      });
    });

    it('does not re-dispatch INVALID when the outcome is unchanged across update cycles', async () => {
      element.required = true;
      await element.updateComplete;

      element.checkValidity();
      expect(invalidCount).toBe(1);

      // Unrelated property changes trigger updated() -> _runValidators(), but the outcome is unchanged.
      element.name = 'one';
      await element.updateComplete;
      element.name = 'two';
      await element.updateComplete;

      expect(invalidCount).toBe(1);
    });

    it('dispatches VALID once when the control becomes valid', async () => {
      element.required = true;
      await element.updateComplete;
      element.checkValidity();

      element.value = 'filled';
      await element.updateComplete;
      expect(validCount).toBe(1);

      element.name = 'unrelated';
      await element.updateComplete;
      expect(validCount).toBe(1);
    });

    it('re-dispatches INVALID when the validation message changes', async () => {
      element.error = true;
      element.errorMessage = 'first message';
      await element.updateComplete;

      element.checkValidity();
      expect(invalidCount).toBe(1);

      element.errorMessage = 'second message';
      await element.updateComplete;

      expect(invalidCount).toBe(2);
    });

    it('re-dispatches INVALID after pristine is reset', async () => {
      element.required = true;
      await element.updateComplete;

      element.checkValidity();
      expect(invalidCount).toBe(1);

      element.pristine = true;
      await element.updateComplete;

      element.checkValidity();
      expect(invalidCount).toBe(2);
    });

    it('keeps ElementInternals validity in sync while skipping event dispatch', async () => {
      element.required = true;
      await element.updateComplete;
      element.checkValidity();
      expect(invalidCount).toBe(1);

      // Switch the failing validator from valueMissing to customError; still invalid, new flag + message.
      element.value = 'filled';
      element.error = true;
      element.errorMessage = 'custom error';
      await element.updateComplete;

      expect(invalidCount).toBe(2);
      expect(element.validity.customError).toBe(true);
      expect(element.validity.valueMissing).toBeUndefined();
      expect(element.validationMessage).toBe('custom error');
    });
  });
});

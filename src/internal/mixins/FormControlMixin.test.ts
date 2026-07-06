import { render } from 'vitest-browser-lit';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
/* eslint-disable lit/no-invalid-html */
/* eslint-disable lit/binding-positions */
import { html, LitElement } from 'lit';

import {
  UUIFormControlBaseMixin,
  UUIFormControlMixin,
  UUIFormControlWithBasicsMixin,
} from './index.js';

const tagName = 'test-form-control-mixin';

customElements.define(
  tagName,
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
});

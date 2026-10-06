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

    it('does not re-dispatch invalid for an unchanged message, but does when it changes', async () => {
      element.error = true;
      await element.updateComplete;

      const onInvalid = vi.fn();
      element.addEventListener(UUIFormControlEvent.INVALID, e => {
        // checkValidity() also fires a native 'invalid' event of the same type.
        if (e instanceof UUIFormControlEvent) onInvalid();
      });

      element.checkValidity();
      expect(onInvalid).toHaveBeenCalledTimes(1);

      element.checkValidity();
      element.checkValidity();
      expect(onInvalid).toHaveBeenCalledTimes(1);

      element.errorMessage = 'A different message';
      await element.updateComplete;
      expect(onInvalid).toHaveBeenCalledTimes(2);
    });

    it('becomes not pristine on blur only when the value changed since focus', () => {
      element.dispatchEvent(new Event('focus'));
      element.dispatchEvent(new Event('blur'));
      expect(element.pristine).toBe(true);

      element.dispatchEvent(new Event('focus'));
      element.value = 'changed';
      element.dispatchEvent(new Event('blur'));
      expect(element.pristine).toBe(false);
    });
  });
});

// Ported from the Umbraco CMS UmbFormControlMixin tests (form-control.mixin.test.ts), to keep the two mixins aligned.
const pristineTagName = defineCE(
  class FormControlPristineTestElement extends UUIFormControlBaseMixin(
    LitElement,
    '',
  ) {
    protected getFormElement() {
      return undefined;
    }

    failCustomValidation(message: string) {
      this.setCustomValidity(message);
    }
    passCustomValidation() {
      this.setCustomValidity(null);
    }
    addChildControl(child: HTMLElement) {
      this.addFormControlElement(child as any);
    }

    render() {
      return html`<slot></slot>`;
    }
  },
);
const pristineTag = unsafeStatic(pristineTagName);

describe('UUIFormControlBaseMixin validation events', () => {
  let element: any;
  let validEvents: number;
  let invalidEvents: number;

  // The INVALID event type is the same string as the native `invalid` event, which `ElementInternals.checkValidity()`
  // fires by itself. Driving state through `pristine` avoids that, and the instanceof check guards against it.
  async function setPristine(value: boolean, el = element) {
    el.pristine = value;
    await el.updateComplete;
  }

  function resetCounts() {
    validEvents = 0;
    invalidEvents = 0;
  }

  async function renderControl() {
    const el = render(
      staticHtml`<${pristineTag}></${pristineTag}>`,
    ).container.querySelector(pristineTagName) as any;
    await el.updateComplete;
    return el;
  }

  beforeEach(async () => {
    element = await renderControl();
    resetCounts();
    element.addEventListener(UUIFormControlEvent.VALID, (e: Event) => {
      if (e instanceof UUIFormControlEvent) validEvents++;
    });
    element.addEventListener(UUIFormControlEvent.INVALID, (e: Event) => {
      if (e instanceof UUIFormControlEvent) invalidEvents++;
    });
  });

  it('does not report Invalid while pristine, even when a validator fails', async () => {
    element.failCustomValidation('Required');
    await element.updateComplete;

    expect(element.pristine).toBe(true);
    expect(invalidEvents).toBe(0);
  });

  it('reports Invalid when going non-pristine while a validator fails', async () => {
    element.failCustomValidation('Required');

    await setPristine(false);

    expect(element.validity.valid).toBe(false);
    expect(invalidEvents).toBe(1);
  });

  it('reports Valid when becoming valid while non-pristine', async () => {
    // Mounting already reported Valid once, so establish an Invalid baseline to make the change to Valid observable.
    element.failCustomValidation('Required');
    await setPristine(false);
    resetCounts();

    element.passCustomValidation();

    expect(element.validity.valid).toBe(true);
    expect(validEvents).toBe(1);
  });

  it('does not report Valid when going pristine again while still invalid', async () => {
    element.failCustomValidation('Required');
    await setPristine(false);
    expect(invalidEvents).toBe(1);
    resetCounts();

    await setPristine(true);

    expect(element.validity.valid).toBe(false);
    expect(validEvents).toBe(0);
  });

  it('does not repeat Valid when going pristine again after already reporting Valid', async () => {
    element.failCustomValidation('Required');
    await setPristine(false);
    expect(invalidEvents).toBe(1);

    element.passCustomValidation();
    expect(validEvents).toBe(1);
    resetCounts();

    await setPristine(true);

    expect(element.validity.valid).toBe(true);
    expect(validEvents).toBe(0);
  });

  it('does not repeat Invalid for consecutive, unchanged reports', async () => {
    element.failCustomValidation('Required');
    await setPristine(false);
    expect(invalidEvents).toBe(1);

    element.failCustomValidation('Required');

    expect(invalidEvents).toBe(1);
  });

  it('dispatches Valid again once the state changes back', async () => {
    element.failCustomValidation('Required');
    await setPristine(false);
    expect(invalidEvents).toBe(1);

    element.passCustomValidation();

    expect(validEvents).toBe(1);
  });

  it('cascades pristine=false onto nested form control elements', async () => {
    const child = await renderControl();
    element.addChildControl(child);
    expect(child.pristine).toBe(true);

    await setPristine(false);

    expect(child.pristine).toBe(false);
  });

  it('does not cascade pristine=true onto nested form control elements', async () => {
    const child = await renderControl();
    element.addChildControl(child);
    await setPristine(false);
    expect(child.pristine).toBe(false);

    await setPristine(true);

    expect(child.pristine).toBe(false);
  });
});

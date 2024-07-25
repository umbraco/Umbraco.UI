import { UUIFormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUIRadioElement } from './uui-radio.element';
import { UUIRadioEvent } from './UUIRadioEvent';
import { UUIRadioGroupEvent } from './UUIRadioGroupEvent';

const ARROW_LEFT = 'ArrowLeft';
const ARROW_UP = 'ArrowUp';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_DOWN = 'ArrowDown';
const SPACE = ' ';
const ENTER = 'Enter';

/**
 * @element uui-radio-group
 * @slot - slot for `<uui-radio>` elements or custom elements that extend from `UUIRadioElement`
 * @extends UUIFormControlMixin
 */
@defineElement('uui-radio-group')
export class UUIRadioGroupElement extends UUIFormControlMixin(LitElement, '') {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  get value() {
    return super.value;
  }
  set value(newValue) {
    super.value = newValue;
    this.#updateRadioElementsCheckedState(newValue as string);
  }

  #selected: number | null = null;
  #radioElements: UUIRadioElement[] = [];

  constructor() {
    super();
    this.addEventListener('keydown', this.#onKeydown);
    this.addEventListener('focusin', this.#onFocusIn);
    this.addEventListener('focusout', this.#onFocusOut);

    // Wait for the radio elements to be added to the dom before updating the checked state.
    this.updateComplete.then(() => {
      this.#updateRadioElementsCheckedState(this.value as string);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'radiogroup');
  }

  updated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(_changedProperties);
    if (_changedProperties.has('disabled')) {
      this.#setDisableOnRadios(this.disabled);
    }

    if (_changedProperties.has('readonly')) {
      this.#setReadonlyOnRadios(this.readonly);
    }

    if (_changedProperties.has('name')) {
      this.#setNameOnRadios(_changedProperties.get('name') as string);
    }
  }

  /**
   * This method enables <label for="..."> to focus the select
   */
  public async focus() {
    await this.updateComplete;
    if (this.#selected !== null) {
      this.#radioElements[this.#selected]?.focus();
    } else {
      this.#findAdjacentRadioElement(1, false)?.focus();
    }
  }
  public async blur() {
    await this.updateComplete;
    if (this.#selected !== null) {
      this.#radioElements[this.#selected]?.blur();
    } else {
      this.#findAdjacentRadioElement(1, false)?.blur();
    }
  }
  public async click() {
    await this.updateComplete;
    if (this.#selected !== null) {
      this.#radioElements[this.#selected]?.click();
    } else {
      this.#findAdjacentRadioElement(1, false)?.click();
    }
  }

  protected getFormElement(): HTMLElement | undefined {
    if (this.#radioElements && this.#selected) {
      return this.#radioElements[this.#selected];
    }
    return undefined;
  }

  #onFocusIn = (event: FocusEvent) => {
    // Ensure only the selected radio element is focusable to improve tab navigation
    // by skipping unselected radios and moving to the next radio group or focusable element.
    this.#radioElements?.forEach(el => {
      if (el !== event.target) {
        el.makeUnfocusable();
      } else {
        el.makeFocusable();
      }
    });
  };

  #onFocusOut = (event: FocusEvent) => {
    // When a focus event is fired from a radio, check if the focus is still inside the radio group
    if (this.contains(event.relatedTarget as Node)) return;

    // If there is a selected radio element, no action is needed since only the selected radio should remain focusable
    if (this.#selected !== null) return;

    // If focus has moved outside the radio group and no radio is selected, make all radio elements focusable again
    this.#radioElements?.forEach(el => {
      el.makeFocusable();
    });
  };

  #onChildBlur = () => {
    this.pristine = false;
  };

  #onSelectClick = (e: UUIRadioEvent) => {
    if (e.target.checked === true) {
      this.value = e.target.value;
      this.#fireChangeEvent();
    }
  };

  #onKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case ARROW_LEFT:
      case ARROW_UP: {
        e.preventDefault();
        this.#selectPreviousRadio();
        break;
      }
      case ARROW_RIGHT:
      case ARROW_DOWN: {
        e.preventDefault();
        this.#selectNextRadio();
        break;
      }

      case SPACE: {
        if (this.#selected === null) {
          this.value = this.#findAdjacentRadioElement(1, false)
            ?.value as string;
          this.#fireChangeEvent();
        }
        break;
      }

      case ENTER:
        this.submit();
    }
  };

  #onSlotChange(e: Event) {
    e.stopPropagation();
    // TODO: make sure to diff new and old ones to only add and remove event listeners on relevant elements.

    this.#radioElements?.forEach(el => {
      el.removeEventListener(
        UUIRadioEvent.CHANGE,
        // @ts-ignore TODO: fix typescript error
        this.#onSelectClick as EventHandlerNonNull,
      );
      el.removeEventListener('blur', this.#onChildBlur);
    });

    this.#selected = null;
    this.#radioElements = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(el => el instanceof UUIRadioElement) as UUIRadioElement[];

    // Only continue if there are radio elements
    if (this.#radioElements.length === 0) return;

    this.#radioElements.forEach(el => {
      el.addEventListener(
        UUIRadioEvent.CHANGE,
        // @ts-ignore TODO: fix typescript error
        this.#onSelectClick as EventHandlerNonNull,
      );
      el.addEventListener('blur', this.#onChildBlur);
    });

    this.#setNameOnRadios(this.name);

    if (this.disabled) {
      this.#setDisableOnRadios(true);
    }

    if (this.readonly) {
      this.#setReadonlyOnRadios(true);
    }

    const checkedRadios = this.#radioElements.filter(el => el.checked === true);

    if (checkedRadios.length > 1) {
      this.#radioElements.forEach(el => {
        el.checked = false;
      });
      this.value = '';
      console.error(
        'There can only be one checked radio among the <' +
          this.nodeName +
          '> children',
        this,
      );
    }

    if (checkedRadios.length === 1) {
      const firstCheckedRadio = checkedRadios[0];
      this.value = firstCheckedRadio.value;
      this.#selected = this.#radioElements.indexOf(firstCheckedRadio);
    }
  }

  #setNameOnRadios(name: string) {
    this.#radioElements?.forEach(el => (el.name = name));
  }

  #updateRadioElementsCheckedState(newValue: FormData | FormDataEntryValue) {
    this.#radioElements.forEach((el, index) => {
      if (el.value === newValue) {
        el.checked = true;
        el.makeFocusable();
        this.#selected = index;
      } else {
        el.checked = false;
      }
    });
  }

  #setDisableOnRadios(value: boolean) {
    this.#radioElements?.forEach(el => (el.disabled = value));
  }

  #setReadonlyOnRadios(value: boolean) {
    this.#radioElements?.forEach(el => (el.readonly = value));
  }

  #findAdjacentRadioElement(
    direction = 1,
    skipFirst = true,
  ): UUIRadioElement | null {
    if (!this.#radioElements || this.#radioElements.length === 0) return null;

    const len = this.#radioElements.length;
    let index = this.#selected ?? 0;

    for (let i = 0; i < len + 1; i++) {
      if (!skipFirst || i > 0) {
        const radioElement = this.#radioElements[index];
        if (!radioElement.disabled && !radioElement.readonly) {
          return radioElement;
        }
      }

      index = (index + direction + len) % len;
    }

    return null;
  }

  #selectPreviousRadio() {
    this.value = this.#findAdjacentRadioElement(-1)?.value ?? '';
    this.#radioElements[this.#selected ?? 0]?.focus();
    this.#fireChangeEvent();
  }

  #selectNextRadio() {
    this.value = this.#findAdjacentRadioElement()?.value ?? '';
    this.#radioElements[this.#selected ?? 0]?.focus();
    this.#fireChangeEvent();
  }

  #fireChangeEvent() {
    this.pristine = false;
    this.dispatchEvent(new UUIRadioGroupEvent(UUIRadioGroupEvent.CHANGE));
  }

  render() {
    return html` <slot @slotchange=${this.#onSlotChange}></slot> `;
  }

  static styles = [
    css`
      :host {
        display: inline-block;
        padding-right: 3px;
        border: 1px solid transparent;
        border-radius: var(--uui-border-radius);
      }

      :host(:not([pristine]):invalid),
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) {
        border: 1px solid var(--uui-color-danger-standalone);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-radio-group': UUIRadioGroupElement;
  }
}

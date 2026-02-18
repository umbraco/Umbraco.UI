import { UUIFormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUICheckboxElement } from './../../uui-checkbox/lib/uui-checkbox.element';
import { UUICheckboxEvent } from './../../uui-checkbox/lib/UUICheckboxEvent';
import { UUICheckboxGroupEvent } from './UUICheckboxGroupEvent';

/*const ARROW_LEFT = 'ArrowLeft';
const ARROW_UP = 'ArrowUp';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_DOWN = 'ArrowDown';
const SPACE = ' ';
const ENTER = 'Enter';*/

/**
 * @element uui-checkbox-group
 * @slot - slot for `<uui-checkbox>` elements or custom elements that extend from `UUICheckboxElement`
 * @extends UUIFormControlMixin
 */
@defineElement('uui-checkbox-group')
export class UUICheckboxGroupElement extends UUIFormControlMixin(
  LitElement,
  '',
) {
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
    //this.#updateCheckboxElementsCheckedState(newValue as string);
  }

  #selected: number | null = null;
  #checkboxElements: UUICheckboxElement[] = [];

  constructor() {
    super();
    //this.addEventListener('keydown', this.#onKeydown);
    //this.addEventListener('focusin', this.#onFocusIn);
    //this.addEventListener('focusout', this.#onFocusOut);

    // Wait for the checkbox elements to be added to the dom before updating the checked state.
    /*this.updateComplete.then(() => {
      this.#updateCheckboxElementsCheckedState(this.value as string);
    });*/
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'group');
  }

  updated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(_changedProperties);
    if (_changedProperties.has('disabled')) {
      this.#setDisableOnCheckboxes(this.disabled);
    }

    if (_changedProperties.has('readonly')) {
      this.#setReadonlyOnCheckboxes(this.readonly);
    }

    if (_changedProperties.has('name')) {
      this.#setNameOnCheckboxes(_changedProperties.get('name') as string);
    }
  }

  /**
   * This method enables <label for="..."> to focus the select
   */
  public async focus() {
    await this.updateComplete;
    if (this.#selected !== null) {
      this.#checkboxElements[this.#selected]?.focus();
    } else {
      this.#findAdjacentCheckboxElement(1, false)?.focus();
    }
  }
  public async blur() {
    await this.updateComplete;
    if (this.#selected !== null) {
      this.#checkboxElements[this.#selected]?.blur();
    } else {
      this.#findAdjacentCheckboxElement(1, false)?.blur();
    }
  }
  public async click() {
    await this.updateComplete;
    if (this.#selected !== null) {
      this.#checkboxElements[this.#selected]?.click();
    } else {
      this.#findAdjacentCheckboxElement(1, false)?.click();
    }
  }

  protected getFormElement(): HTMLElement | undefined {
    if (this.#checkboxElements && this.#selected) {
      return this.#checkboxElements[this.#selected];
    }
    return undefined;
  }

  /*#onFocusIn = (event: FocusEvent) => {
    // Ensure only the selected checkbox element is focusable to improve tab navigation
    // by skipping unselected checkboxes and moving to the next checkbox group or focusable element.
    this.#checkboxElements?.forEach(el => {
      if (el !== event.target) {
        el.makeUnfocusable();
      } else {
        el.makeFocusable();
      }
    });
  };

  #onFocusOut = (event: FocusEvent) => {
    // When a focus event is fired from a checkbox, check if the focus is still inside the checkbox group
    if (this.contains(event.relatedTarget as Node)) return;

    // If there is a selected checkbox element, no action is needed since only the selected checkbox should remain focusable
    if (this.#selected !== null) return;

    // If focus has moved outside the checkbox group and no checkbox is selected, make all checkbox elements focusable again
    this.#checkboxElements?.forEach(el => {
      el.makeFocusable();
    });
  };*/

  #onChildBlur = () => {
    this.pristine = false;
  };

  #onSelectClick = (e: UUICheckboxEvent) => {
    if (e.target.checked === true) {
      this.value = e.target.value;
      this.#fireChangeEvent();
    }
  };

  /*#onKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case ARROW_LEFT:
      case ARROW_UP: {
        e.preventDefault();
        this.#selectPreviousCheckbox();
        break;
      }
      case ARROW_RIGHT:
      case ARROW_DOWN: {
        e.preventDefault();
        this.#selectNextCheckbox();
        break;
      }

      case SPACE: {
        if (this.#selected === null) {
          this.value = this.#findAdjacentCheckboxElement(1, false)
            ?.value as string;
          this.#fireChangeEvent();
        }
        break;
      }

      case ENTER:
        this.submit();
    }
  };*/

  #onSlotChange(e: Event) {
    e.stopPropagation();
    // TODO: make sure to diff new and old ones to only add and remove event listeners on relevant elements.

    this.#checkboxElements?.forEach(el => {
      el.removeEventListener(
        UUICheckboxEvent.CHANGE,
        // @ts-ignore TODO: fix typescript error
        this.#onSelectClick as EventHandlerNonNull,
      );
      el.removeEventListener('blur', this.#onChildBlur);
    });

    this.#selected = null;
    this.#checkboxElements = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(el => el instanceof UUICheckboxElement) as UUICheckboxElement[];

    // Only continue if there are checkbox elements
    if (this.#checkboxElements.length === 0) return;

    this.#checkboxElements.forEach(el => {
      el.addEventListener(
        UUICheckboxEvent.CHANGE,
        // @ts-ignore TODO: fix typescript error
        this.#onSelectClick as EventHandlerNonNull,
      );
      el.addEventListener('blur', this.#onChildBlur);
    });

    this.#setNameOnCheckboxes(this.name);

    if (this.disabled) {
      this.#setDisableOnCheckboxes(true);
    }

    if (this.readonly) {
      this.#setReadonlyOnCheckboxes(true);
    }
  }

  #setNameOnCheckboxes(name: string) {
    this.#checkboxElements?.forEach(el => (el.name = name));
  }

  /*#updateCheckboxElementsCheckedState(newValue: FormData | FormDataEntryValue) {
    const notChecked: Array<UUICheckboxElement> = [];

    this.#checkboxElements.forEach((el, index) => {
      if (el.value === newValue) {
        el.checked = true;
        el.makeFocusable();
        this.#selected = index;
      } else {
        el.checked = false;
        notChecked.push(el);
      }
    });

    // If there is a selected checkbox, make all other checkboxes unfocusable.
    if (this.#selected !== null) {
      notChecked.forEach(el => el.makeUnfocusable());
    }
  }*/

  #setDisableOnCheckboxes(value: boolean) {
    this.#checkboxElements?.forEach(el => (el.disabled = value));
  }

  #setReadonlyOnCheckboxes(value: boolean) {
    this.#checkboxElements?.forEach(el => (el.readonly = value));
  }

  #findAdjacentCheckboxElement(
    direction = 1,
    skipFirst = true,
  ): UUICheckboxElement | null {
    if (!this.#checkboxElements || this.#checkboxElements.length === 0)
      return null;

    const len = this.#checkboxElements.length;
    let index = this.#selected ?? 0;

    for (let i = 0; i < len + 1; i++) {
      if (!skipFirst || i > 0) {
        const checkboxElement = this.#checkboxElements[index];
        if (!checkboxElement.disabled && !checkboxElement.readonly) {
          return checkboxElement;
        }
      }

      index = (index + direction + len) % len;
    }

    return null;
  }

  /*#selectPreviousCheckbox() {
    this.value = this.#findAdjacentCheckboxElement(-1)?.value ?? '';
    this.#checkboxElements[this.#selected ?? 0]?.focus();
    this.#fireChangeEvent();
  }

  #selectNextCheckbox() {
    this.value = this.#findAdjacentCheckboxElement()?.value ?? '';
    this.#checkboxElements[this.#selected ?? 0]?.focus();
    this.#fireChangeEvent();
  }*/

  #fireChangeEvent() {
    this.pristine = false;
    this.dispatchEvent(new UUICheckboxGroupEvent(UUICheckboxGroupEvent.CHANGE));
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
        border: 1px solid var(--uui-color-invalid-standalone);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-checkbox-group': UUICheckboxGroupElement;
  }
}

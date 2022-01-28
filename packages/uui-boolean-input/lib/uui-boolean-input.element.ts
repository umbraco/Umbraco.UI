import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { css, html, LitElement, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';

import { UUIBooleanInputEvent } from './UUIBooleanInputEvent';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Base class wrapping native input type="checkbox". Extend for custom boolean input.
 * @extends LabelMixin
 * @fires UUIBooleanInputEvent#change on change
 * @abstract
 */
export abstract class UUIBooleanInputElement extends LabelMixin(
  '',
  LitElement
) {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      label {
        cursor: pointer;
        user-select: none;

        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-items: center;
        gap: var(--uui-size-3);
      }

      input {
        position: absolute;
        height: 0px;
        width: 0px;
      }

      :host([label-position='left']) label {
        flex-direction: row-reverse;
      }

      :host([label-position='top']) label {
        gap: var(--uui-size-half-base-unit);
        flex-direction: column-reverse;
      }

      :host([label-position='bottom']) label {
        gap: var(--uui-size-half-base-unit);
        flex-direction: column;
      }

      :host([disabled]) .label {
        opacity: 0.5;
      }
    `,
  ];

  @query('#input')
  protected _input!: HTMLInputElement;

  private _value = 'on';

  /**
   * This is a value property of the uui-checkbox or the uui-toggle component. The default value of this property is 'on'. It reflects the behaviour of the native input type="checkbox" element and its value attribute.
   * @type {string}
   * @attr
   * @default on
   */
  @property({ type: String })
  get value() {
    return this._value;
  }

  set value(newVal) {
    const oldValue = this._value;
    this._value = newVal;
    this._internals.setFormValue(
      this._checked && this.name !== '' ? this._value : null
    );

    this.requestUpdate('value', oldValue);
  }

  /**
   * This is the name property of the uui-checkbox or the uui-toggle component. It reflects the behaviour of the native input type="checkbox" element and its name attribute.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  name = '';

  /**
   * Specifies the label position of the checkbox or the toggle
   * @type {'left' | 'right' | 'top' | 'bottom'}
   * @attr label-position
   * @default right
   */
  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'right';

  /**
   * Set to true if the component should have an error state. Property is reflected to the corresponding attribute.
   * @type {boolean}
   * @attr error
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  private _checked = false;

  /**
   * Reflects the state of the element. True if checkbox or toggle is checked. Change this to switch the state programmatically.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get checked() {
    return this._checked;
  }

  set checked(newVal) {
    const oldValue = this._checked;
    this._checked = newVal;
    this._internals.setFormValue(
      this._checked && this.name !== ''
        ? this._value
          ? this._value
          : 'on'
        : null
    );
    this.requestUpdate('checked', oldValue);
  }

  /**
   * Reflects the disabled state of the element. True if checkbox or toggle is disabled. Change this to switch the state programmatically.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  readonly _internals;
  private inputRole: 'checkbox' | 'switch';

  constructor(inputRole: 'checkbox' | 'switch' = 'checkbox') {
    super();
    this.inputRole = inputRole;
    this._internals = (this as any).attachInternals();
  }

  protected firstUpdated(): void {
    const labelEl = this.shadowRoot?.querySelector('label') as HTMLLabelElement;

    // hide outline if mouse-interaction:
    let hadMouseDown = false;
    this._input.addEventListener('blur', () => {
      if (hadMouseDown === false) {
        this.style.setProperty('--uui-show-focus-outline', '1');
      }
      hadMouseDown = false;
    });
    labelEl.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
      hadMouseDown = true;
    });
    labelEl.addEventListener('mouseup', () => {
      hadMouseDown = false;
    });
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  focus() {
    (this.shadowRoot?.querySelector('#input') as any).focus();
  }
  click() {
    (this.shadowRoot?.querySelector('#input') as any).click();
  }

  private _onInputChange() {
    this.checked = this._input.checked;
    this.dispatchEvent(new UUIBooleanInputEvent(UUIBooleanInputEvent.CHANGE));
  }

  /**
   * When extending UUIBooleanInputBase class you need to implement this abstract method. It should return a template of your input.
   * @returns {TemplateResult}
   * @abstract
   * @method
   */
  protected abstract renderCheckbox(): TemplateResult;

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          id="input"
          ?disabled="${this.disabled}"
          @change="${this._onInputChange}"
          .checked="${this.checked}"
          aria-checked="${this.checked ? 'true' : 'false'}"
          aria-label=${this.label}
          role="${this.inputRole}" />
        ${this.renderCheckbox()} ${this.renderLabel()}
      </label>
    `;
  }
}

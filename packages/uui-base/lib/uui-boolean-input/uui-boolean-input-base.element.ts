import { LitElement, html, css, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { LabelMixin } from '../mixins/LabelMixin';
import { UUIBooleanInputEvent } from './UUIBooleanInputEvent';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Base class wrapping native input type="checkbox". Extend if you need to make a custom boolean input. Change the role of the input by passing a 'checkbox' || 'switch' to the super() when extending this class. Default is checkbox. Extending this class will make your element formAssociated, meaning it can participate in the native form element.
 * @extends LabelMixin
 * @fires UUIBooleanInputEvent#change on change
 * @abstract
 */
export abstract class UUIBooleanInputBaseElement extends LabelMixin(
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
        gap: var(--uui-size-xsmall);
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
   * Set to true to hide the labeling provided by the component.
   * @type {boolean}
   * @attr hide-label
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

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

  private _onInputChange() {
    this.checked = this._input.checked;
    this.dispatchEvent(
      new UUIBooleanInputEvent(UUIBooleanInputEvent.CHANGE, { bubbles: true })
    );
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
        ${this.renderCheckbox()}
        ${this.hideLabel === false ? this.renderLabel() : ''}
      </label>
    `;
  }
}

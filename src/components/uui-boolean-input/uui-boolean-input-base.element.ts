import { LitElement, html, css, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators';
import { LabelMixin } from '../../mixins/LabelMixin';
import { UUIBooleanInputEvent } from './UUIBooleanInputEvent';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

// TODO - validation - required option??? does it even make sense? if so what it should output. make it possible that it has to be checked.

/**
 * Base class wrapping native <input type="checkbox"/>. Use if you need a boolean input. Chenge the role of the input by passing a 'checkbox' || 'switch' to the super() when extending this class. Default is checkbox.
 * @extends LabelMixin
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
   * This is a value property of the uui-checkbox or the uui-toggle component. The default value of this property is 'on'. It reflects the behaviour of the native <input type="checkbox"> element and its value attribute.
   * @type {string}
   * @attr
   * @default 'on'
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
   * This is a name property of the uui-checkbox or the uui-toggle component. It reflects the behaviour of the native <input type="checkbox"> element and its name attribute.
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
   * @default 'right'
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

  private _checked = false;

  /**
   * Reflects the state of the element. True if checkbox or toggle is checked. Change this to switch the state programatically.
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
    this._internals.setFormValue(this._checked ? this._value : null);
    this.requestUpdate('checked', oldValue);
  }

  /**
   * Reflects the disabled state of the element. True if checkbox or toggle is disabled. Change this to switch the state programatically.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _onInputChange() {
    this.dispatchEvent(new UUIBooleanInputEvent(UUIBooleanInputEvent.CHANGE));
    this.checked = this._input.checked;
  }

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
          role="${this.inputRole}"
        />
        ${this.renderCheckbox()}
        ${this.hideLabel === false ? this.renderLabel() : ''}
      </label>
    `;
  }
}

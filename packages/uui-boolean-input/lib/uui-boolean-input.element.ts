import { FormControlMixin, LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
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
export abstract class UUIBooleanInputElement extends FormControlMixin(
  LabelMixin('', LitElement)
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

  /** intentional overwrite of FormControlMixins value getter and setter method. */
  get value() {
    return this._value as string;
  }
  set value(newVal: string) {
    const oldValue = this._value;
    this._value = newVal;
    if (
      'ElementInternals' in window &&
      //@ts-ignore
      'setFormValue' in window.ElementInternals.prototype
    ) {
      this._internals.setFormValue(
        this._checked && this.name !== '' ? this._value : null
      );
    }

    this.requestUpdate('value', oldValue);
  }

  /**
   * Specifies the label position of the checkbox or the toggle
   * @type {'left' | 'right' | 'top' | 'bottom'}
   * @attr label-position
   * @default right
   */
  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'right';

  private _checked = false;

  /**
   * Reflects the state of the element.
   * True if checkbox or toggle is checked. Change this to switch the state programmatically.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean }) // Do not 'reflect' as the attribute is used as fallback.
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
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @query('#input')
  protected _input!: HTMLInputElement;

  private inputRole: 'checkbox' | 'switch';

  constructor(inputRole: 'checkbox' | 'switch' = 'checkbox') {
    super();
    if (this._value === '') {
      this._value = 'on';
    }
    this.inputRole = inputRole;
  }

  protected getFormElement(): HTMLElement {
    return this._input;
  }

  public hasValue(): boolean {
    return this.checked;
  }

  public formResetCallback() {
    super.formResetCallback();
    this.checked = this.hasAttribute('checked');
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
    this._input.focus();
  }
  click() {
    this._input.click();
  }

  private _onInputChange() {
    this.pristine = false;
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
          id="input"
          type="checkbox"
          @change="${this._onInputChange}"
          .disabled=${this.disabled}
          .checked=${this.checked}
          aria-checked="${this.checked ? 'true' : 'false'}"
          aria-label=${this.label}
          role="${this.inputRole}" />
        ${this.renderCheckbox()} ${this.renderLabel()}
      </label>
    `;
  }
}

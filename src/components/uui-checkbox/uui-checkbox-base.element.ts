import { LitElement, html, css, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators';
import { LabelMixin } from '../../mixins/LabelMixin';
import { UUICheckboxEvent } from './UUICheckboxEvent';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

// TODO - validation - required option??? does it even make sense? if so what it should output. make it possible that it has to be checked.

/**
 *  @element uui-toggle
 *  @fires {UUIToggleEvent} change - fires when the element is begin checked by a user action
 *  @slot - to overwrite displayed label content
 *  @description - A Umbraco Toggle-switch, toggles between off/on
 */
export abstract class UUICheckboxBaseElement extends LabelMixin(
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

  private _internals;
  private inputRole: 'checkbox' | 'switch';

  constructor(inputRole: 'checkbox' | 'switch' = 'checkbox') {
    super();
    this.inputRole = inputRole;
    this._internals = (this as any).attachInternals();
  }

  @property({ type: String })
  form: string | null = null;

  @query('#input')
  protected _input!: HTMLInputElement;

  private _value = 'on';

  @property({ reflect: true })
  get value() {
    return this._value;
  }

  set value(newVal) {
    const oldValue = this._value;
    this._value = newVal;
    this._internals.setFormValue(this._checked ? this._value : null);
    this.requestUpdate('value', oldValue);
  }

  @property({ type: String })
  name = '';

  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'right';

  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  private _checked = false;

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

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _onInputChange() {
    this.dispatchEvent(new UUICheckboxEvent(UUICheckboxEvent.CHANGE));
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

//

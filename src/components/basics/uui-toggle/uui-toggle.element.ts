import { LitElement, html, property, css, query } from 'lit-element';
import { UUIToggleChangeEvent } from './UUIToggleChangeEvent';
import {
  UUIHorizontalShakeKeyframes,
  UUIHorizontalShakeAnimationValue,
} from '../../../animations/uui-shake';
import { iconWrong, iconCheck } from './toggle-icons';

/**
 *  @element uui-toggle
 */

// TODO - validation - required option??? does it even make sense? if so what it should output. make it possible that it has to be checked.

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';
export class UUIToggleElement extends LitElement {
  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        --uui-toggle-size: 18px;
        --uui-toggle-switch-width: calc(2 * var(--uui-toggle-size));
        /*
        --uui-toggle-focus-outline: 0 0 1px 1.5px var(--uui-color-violet-blue);
        */
      }

      label {
        cursor: pointer;
        user-select: none;
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        grid-template-rows: max-content 1fr max-content;
        grid-template-areas:
          'top-left top top-right'
          'left center right'
          'bottom-left bottom bottom-right';
        grid-gap: var(--uui-size-base-unit);
      }

      input {
        position: absolute;
        height: 0px;
        width: 0px;
      }

      #slider {
        position: relative;
        grid-area: center;
        display: flex;
        align-items: center;

        width: var(--uui-toggle-switch-width);
        height: var(--uui-toggle-size);
        border-radius: 100px;

        background-color: var(
          --uui-toggle-background-color,
          var(--uui-interface-surface-alt)
        );
        border: 1px solid
          var(--uui-toggle-border-color, var(--uui-interface-border));
        font-size: calc(var(--uui-toggle-size) * 0.6);
      }
      label:hover input:not([disabled]) + #slider {
        border-color: var(
          --uui-toggle-border-color-hover,
          var(--uui-interface-border-hover)
        );
        background-color: var(
          --uui-toggle-background-color-hover,
          var(--uui-interface-surface-alt-hover)
        );
      }
      label:focus #slider {
        border-color: var(
          --uui-toggle-border-color-focus,
          var(--uui-interface-border-focus)
        );
        background-color: var(
          --uui-toggle-background-color-focus,
          var(--uui-interface-surface-alt-focus)
        );
      }
      input:checked + #slider {
        background-color: var(--uui-interface-selected);
      }
      label:hover input:checked:not([disabled]) + #slider {
        background-color: var(--uui-interface-selected-hover);
      }
      label:focus input:checked + #slider {
        background-color: var(--uui-interface-selected-focus);
      }

      #icon-container-check,
      #icon-container-wrong {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition: fill 120ms;
      }

      #icon-container-check {
        margin-left: -0.5em;
        left: calc(var(--uui-toggle-size) * 0.5);
        fill: var(--uui-interface-contrast);
      }

      #icon-container-wrong {
        margin-right: -0.5em;
        right: calc(var(--uui-toggle-size) * 0.5);
        fill: var(--uui-interface-selected);
      }

      input:checked + #slider #icon-container-check {
        fill: var(--uui-interface-selected-contrast);
      }

      #slider:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--uui-toggle-size) - 4px);
        height: calc(var(--uui-toggle-size) - 4px);
        border-radius: 100px;
        background-color: var(--uui-interface-surface);
        transition: width 120ms ease, left 120ms ease, transform 120ms ease,
          background-color 120ms;
      }

      input:checked + #slider:after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }

      #slider:active:after {
        /** Stretch when mouse down */
        width: calc(1.06 * var(--uui-toggle-size));
      }

      :host([hide-label]) #label-text {
        height: 0;
        width: 0;
        opacity: 0;
      }

      :host([label-position='left']) #label-text {
        grid-area: left;
      }

      :host([label-position='right']) #label-text {
        grid-area: right;
      }

      :host([label-position='top']) #label-text {
        grid-area: top;
      }

      :host([label-position='bottom']) #label-text {
        grid-area: bottom;
      }

      :host([disabled]) #label-text {
        opacity: 0.5;
      }

      :host([disabled]) #slider:active {
        animation: ${UUIHorizontalShakeAnimationValue};
      }

      :host([disabled]) #slider:active:after {
        width: calc(0.8 * var(--uui-toggle-size));
      }

      :host([disabled]) #slider {
        background-color: var(--uui-interface-surface-alt-disabled);
      }
      :host([disabled]) #slider:after {
        background-color: var(--uui-interface-surface-disabled);
      }

      :host([disabled]) #slider > #icon-container-wrong {
        fill: var(--uui-interface-contrast-disabled);
      }

      /*
      input:focus + #slider,
      input:not([disabled]) + #slider:active {
        box-shadow: var(--uui-toggle-focus-outline);
      }
      */
    `,
  ];

  static formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  @query('#switch')
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
  label = 'Toggle switch';

  @property()
  form: string | null = null;

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'left';

  @property({ type: Boolean, attribute: 'hide-label' })
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

  firstUpdated() {
    if (this.label && !this.name) {
      this.name = this.label;
    }
    this._input.setAttribute('role', 'switch');
  }

  private _onInputChange() {
    this.dispatchEvent(new UUIToggleChangeEvent());
    this.checked = this._input.checked;
  }

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          id="switch"
          ?disabled="${this.disabled}"
          @change="${this._onInputChange}"
          .checked="${this.checked}"
          aria-checked="${this.checked ? 'true' : 'false'}"
        />
        <div id="slider">
          <div id="icon-container-check">${iconCheck}</div>
          <div id="icon-container-wrong">${iconWrong}</div>
        </div>
        <div id="label-text">${this.label}</div>
      </label>
    `;
  }
}

//

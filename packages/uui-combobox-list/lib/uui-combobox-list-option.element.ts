import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ActiveMixin, SelectableMixin } from '@umbraco-ui/uui-base/lib/mixins';

/**
 * @element uui-combobox-list-option
 */
@defineElement('uui-combobox-list-option')
export class UUIComboboxListOptionElement extends SelectableMixin(
  ActiveMixin(LitElement)
) {
  static styles = [
    css`
      :host {
        position: relative;
        cursor: pointer;
        margin: 0 6px;
        border-radius: var(--uui-border-radius);
        outline: 2px solid transparent;
        outline-offset: -2px;
      }
      :host(:first-child) {
        margin-top: 6px;
      }
      :host(:last-child) {
        margin-bottom: 6px;
      }

      :host([active])::after {
        display: block;
        content: '';
        position: absolute;
        z-index: 1;
        inset: 0px;
        outline: white solid 2px;
        outline-offset: -4px;
      }

      :host::before {
        display: block;
        content: '';
        opacity: 0;
        position: absolute;
        z-index: -1;
        inset: 0;
        background-color: var(--uui-interface-select);
      }

      :host(:hover)::before {
        opacity: 0.15;
        border-radius: var(--uui-border-radius);
      }

      :host([disabled]) {
        cursor: auto;
        color: var(--uui-interface-surface-contrast-disabled);
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]:hover) {
        background-color: var(--uui-interface-surface-disabled);
      }

      :host([active]) {
        outline-color: var(--uui-interface-outline);
      }

      :host([selected]) {
        color: var(--uui-interface-select-contrast);
        background-color: var(--uui-interface-select);
      }
      :host([selected]:hover) {
        color: var(--uui-interface-select-contrast-hover);
        background-color: var(--uui-interface-select-hover);
      }
      :host([selected][disabled]) {
        color: var(--uui-interface-select-contrast-disabled);
        background-color: var(--uui-interface-select-disabled);
      }
    `,
  ];

  private _value: any;

  @property()
  public get value() {
    return this._value ? this._value : this.textContent;
  }
  public set value(newValue) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
  }

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property({ type: String, attribute: 'display-value' })
  public displayValue: string = '';

  @property({ type: Boolean }) //TODO should probably just be this.selectable = true;
  public selectable = true;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox-list-option': UUIComboboxListOptionElement;
  }
}

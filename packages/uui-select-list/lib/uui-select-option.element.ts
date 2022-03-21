import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ActiveMixin, SelectableMixin } from 'packages/uui-base/lib/mixins';
import { UUISelectListEvent } from './UUISelectListEvent';

/**
 * @element uui-select-option
 */
@defineElement('uui-select-option')
export class UUISelectOptionElement extends SelectableMixin(
  ActiveMixin(LitElement)
) {
  static styles = [
    css`
      :host {
        position: relative;
        cursor: pointer;
      }
      :host::after {
        position: absolute;
        content: '';
        outline-offset: -4px;
        border-radius: 8px;
        outline: 4px solid transparent;
        inset: 0;
      }

      :host([disabled]) {
        cursor: auto;
        color: var(--uui-interface-surface-contrast-disabled);
      }
      :host([disabled]) {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]:hover) {
        background-color: var(--uui-interface-surface-disabled);
      }

      :host([active])::after {
        outline-color: var(--uui-interface-active);
      }

      :host([active]) {
        color: var(--uui-interface-active-contrast);
      }
      :host([active]:hover) {
        color: var(--uui-interface-active-contrast-hover);
      }
      :host([active]) {
        background-color: var(--uui-interface-active);
      }
      :host([active]:hover) {
        background-color: var(--uui-interface-active-hover);
      }
      :host([active][disabled]) {
        color: var(--uui-interface-active-contrast-disabled);
        background-color: var(--uui-interface-active-disabled);
      }

      :host([selected]) {
        color: var(--uui-interface-select-contrast);
      }
      :host([selected]:hover) {
        color: var(--uui-interface-select-contrast-hover);
      }
      :host([selected]) {
        background-color: var(--uui-interface-select);
      }
      :host([selected]:hover) {
        background-color: var(--uui-interface-select-hover);
      }
      :host([selected][disabled]) {
        color: var(--uui-interface-select-contrast-disabled);
        background-color: var(--uui-interface-select-disabled);
      }
    `,
  ];

  //TODO: Add a selected and active state to manage the styling here.

  @property()
  public value: any = undefined;

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property({ type: String, attribute: 'display-value' })
  displayValue: string = '';

  @property({ attribute: 'selectable' })
  selectable = true;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select-option': UUISelectOptionElement;
  }
}

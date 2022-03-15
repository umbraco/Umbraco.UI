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
        cursor: pointer;
      }

      :host([disabled]) {
        color: var(--uui-interface-surface-contrast-disabled);
      }
      :host([disabled]) #label-button-background {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-surface-disabled);
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

  @property({ attribute: false })
  public value: any = undefined;

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
  }

  private _onClick = () => {
    this.dispatchEvent(new UUISelectListEvent(UUISelectListEvent.OPTION_CLICK));
  };

  render() {
    // TODO: Fix
    // eslint-disable-next-line lit-a11y/click-events-have-key-events
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select-option': UUISelectOptionElement;
  }
}

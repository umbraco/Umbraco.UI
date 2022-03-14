import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { UUISelectListEvent } from './UUISelectListEvent';

/**
 * @element uui-select-option
 */
@defineElement('uui-select-option')
export class UUISelectOptionElement extends LitElement {
  static styles = [
    css`
      :host {
      }
    `,
  ];

  //TODO: Add a selected and active state to manage the styling here.

  @property({ attribute: false })
  value: any = undefined;

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

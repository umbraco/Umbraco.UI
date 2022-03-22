import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, query, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { UUISelectCustomEvent } from './UUISelectCustomEvent';
import { UUISelectListEvent } from 'packages/uui-select-list/lib/UUISelectListEvent';
import { UUISelectOptionElement } from 'packages/uui-select-list/lib/uui-select-option.element';

/**
 * @element uui-select-custom
 */
@defineElement('uui-select-custom')
export class UUISelectCustomElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
      }

      #input {
        box-sizing: border-box;
        width: 400px;
        padding: 8px 12px;
        border: 1px solid var(--uui-interface-border);
        border-radius: 6px;
        font-weight: bold;
        font-size: 1rem;
        font-family: 'Lato';
      }

      uui-select-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-height: 500px;
        overflow: auto;
      }

      #dropdown {
        overflow: hidden;
        border: 1px solid var(--uui-interface-border);
        border-radius: 6px;
        width: 400px;
        max-height: 500px;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-3);
      }

      .region {
        text-align: center;
        padding: 8px;
        font-weight: bold;
        color: #333333;
      }

      .region:not(:first-child) {
        border-top: 1px solid #333333;
      }

      uui-select-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 8px;
      }

      uui-select-option img {
        height: 24px;
      }
    `,
  ];

  @query('#input')
  input!: HTMLInputElement;

  @property({ type: String })
  search = '';

  @property({ type: Boolean })
  open = false;

  @state()
  _value: any;

  @state()
  displayValue = '';

  @property({ attribute: false })
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
  }

  private _onInput = (e: any) => {
    this.search = e.target.value;
    this.dispatchEvent(new UUISelectCustomEvent(UUISelectCustomEvent.INPUT));
  };

  private _onChange = (e: UUISelectListEvent) => {
    this.value = (e.composedPath()[0] as UUISelectOptionElement)?.value;
    this.displayValue = (
      e.composedPath()[0] as UUISelectOptionElement
    )?.displayValue;
    this.search = this.value ? this.search : '';
    this.dispatchEvent(new UUISelectCustomEvent(UUISelectCustomEvent.INPUT));
  };

  render() {
    return html`
      <uui-popover
        .open=${this.open}
        .margin=${10}
        @close=${() => (this.open = false)}>
        <input
          slot="trigger"
          id="input"
          type="text"
          @focus=${() => (this.open = true)}
          .value=${this.displayValue}
          @input=${this._onInput} />
        <div id="dropdown" slot="popover">
          <uui-select-list @change=${this._onChange}>
            <slot></slot>
          </uui-select-list>
        </div>
      </uui-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select-custom': UUISelectCustomElement;
  }
}

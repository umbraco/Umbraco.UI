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
        display: block;
      }

      #input {
        box-sizing: border-box;
        width: 100%;
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
        overflow: auto;
        max-height: var(--uui-select-dropdown-max-height, 500px);
      }

      #dropdown {
        overflow: hidden;
        border: 1px solid var(--uui-interface-border);
        border-radius: 6px;
        width: 100%;
        height: 100%;
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
  private _input!: HTMLInputElement;

  @property({ type: String })
  public search = '';

  @property({ type: Boolean })
  public open = false;

  @property({ attribute: false })
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
  }

  @state()
  private _value: any;

  @state()
  private displayValue = '';

  private _selectedElement: UUISelectOptionElement | undefined;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);
    this.addEventListener('blur', this._onBlur);
    this.addEventListener('mousedown', this._onMouseDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._onFocus);
    this.removeEventListener('blur', this._onBlur);
    this.removeEventListener('mousedown', this._onMouseDown);
  }

  private _onMouseDown = () => requestAnimationFrame(() => this._input.focus());
  private _onBlur = () =>
    requestAnimationFrame(() => {
      if (document.activeElement !== this) {
        this.open = false;
      }
    });

  private _onFocus = () => (this.open = true);

  private _onInput = (e: any) => {
    this.search = e.target.value;
    this.dispatchEvent(new UUISelectCustomEvent(UUISelectCustomEvent.INPUT));
  };

  private _onChange = (e: UUISelectListEvent) => {
    this._selectedElement = e.composedPath()[0] as UUISelectOptionElement;
    this.value = this._selectedElement?.value;
    this.displayValue = this._selectedElement?.displayValue;
    this.search = this.value ? this.search : '';
    this.dispatchEvent(new UUISelectCustomEvent(UUISelectCustomEvent.INPUT));
  };

  private _close = () => {
    this.open = false;
    this.displayValue = this._selectedElement?.displayValue || '';
    this._input.value = this.displayValue;
  };

  render() {
    return html`
      <uui-popover
        .open=${this.open}
        .margin=${10}
        @close=${() => this._close()}>
        <input
          slot="trigger"
          id="input"
          type="text"
          .value=${this.displayValue}
          placeholder=${this.displayValue}
          @input=${this._onInput} />
        <div id="dropdown" slot="popover">
          <uui-select-list .value=${this.value} @change=${this._onChange}>
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

import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { property, query, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { UUIComboboxEvent } from './UUIComboboxEvent';
import {
  UUIComboboxListOptionElement,
  UUIComboboxListEvent,
} from '@umbraco-ui/uui-combobox-list/lib';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins/FormControlMixin';
import { iconRemove } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';

/**
 * @element uui-combobox
 */
@defineElement('uui-combobox')
export class UUIComboboxElement extends FormControlMixin(LitElement) {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
      }

      #combobox-input {
        width: 100%;
        border-radius: var(--uui-size-1);
      }

      uui-combobox-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: auto;
        max-height: var(--uui-combobox-list-max-height, 500px);
      }

      #dropdown {
        overflow: hidden;
        border: 1px solid var(--uui-interface-border);
        border-radius: var(--uui-border-radius);
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-3);
      }

      // TODO START: Replace with uui-scroll-container if it removes the right margin
      uui-combobox-list {
        scrollbar-width: thin;
        scrollbar-color: var(--uui-interface-contrast-disabled)
          var(--uui-interface-background-alt);
      }
      uui-combobox-list::-webkit-scrollbar {
        width: 6px;
        height: 6px; /* needed for horizontal scrollbar */
      }
      uui-combobox-list::-webkit-scrollbar-track {
        background: var(--uui-interface-background-alt);
        border-radius: 3px;
      }
      uui-combobox-list::-webkit-scrollbar-thumb {
        background-color: var(--uui-interface-contrast-disabled);
        border-radius: 3px;
      }
      // TODO END
    `,
  ];

  @property({ type: String })
  public get search() {
    return this._search;
  }
  public set search(newValue) {
    if (this.search === newValue) return;
    const oldValue = this._search;
    this._search = newValue;
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.INPUT));
    this.requestUpdate('search', oldValue);
  }

  @property({ type: Boolean })
  public open = false;

  @query('#combobox-input')
  private _input!: HTMLInputElement; // TODO: Replace with uui-input when it implements an input event.

  @state()
  private _displayValue = '';

  @state()
  private _search = '';

  private _selectedElement: UUIComboboxListOptionElement | undefined;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);
    this.addEventListener('blur', this._onBlur);
    this.addEventListener('mousedown', this._onMouseDown);
    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-combobox-list');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._onFocus);
    this.removeEventListener('blur', this._onBlur);
    this.removeEventListener('mousedown', this._onMouseDown);
  }

  protected getFormElement(): HTMLElement | undefined {
    return this._input;
  }

  private _onMouseDown = () => requestAnimationFrame(() => this._input.focus());
  private _onBlur = () =>
    requestAnimationFrame(() => {
      if (document.activeElement !== this) {
        this._close();
      }
    });

  private _onFocus = () => (this.open = true);

  private _onInput = (e: any) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.search = e.target.value;
  };

  private _onChange = (e: UUIComboboxListEvent) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    this._selectedElement = e.composedPath()[0] as UUIComboboxListOptionElement;
    this.value = this._selectedElement?.value || '';

    this._displayValue = this._selectedElement?.displayValue;
    this.search = this.value ? this.search : '';
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  private _close = () => {
    this.open = false;
    this._displayValue = this._selectedElement?.displayValue || '';
    console.log('whatased+', this._selectedElement);

    this._input.value = this._displayValue;
    this.search = '';
  };

  private _clear = (e: Event) => {
    if (e.key && e.key !== 'Enter') return;

    e.preventDefault();
    e.stopImmediatePropagation();

    this._displayValue = '';
    this._input.value = this._displayValue;
    this.value = '';
    this.search = '';
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  render() {
    return html`
      <uui-popover
        .open=${this.open}
        .margin=${10}
        @close=${() => this._close()}>
        <uui-input
          slot="trigger"
          id="combobox-input"
          type="text"
          .value=${this._displayValue}
          .placeholder=${this._displayValue}
          @input=${this._onInput}>
          <slot name="input-prepend" slot="prepend"></slot>
          <uui-button
            @click=${this._clear}
            @keydown=${this._clear}
            slot="append"
            compact
            style="height: 100%; --uui-button-padding-top-factor:0; --uui-button-padding-bottom-factor:0;">
            <uui-icon
              name="remove"
              .fallback=${iconRemove.strings[0]}></uui-icon>
          </uui-button>
          <slot name="input-append" slot="append"></slot>
        </uui-input>
        <div id="dropdown" slot="popover">
          <uui-combobox-list .value=${this.value} @change=${this._onChange}>
            <slot></slot>
          </uui-combobox-list>
        </div>
      </uui-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox': UUIComboboxElement;
  }
}

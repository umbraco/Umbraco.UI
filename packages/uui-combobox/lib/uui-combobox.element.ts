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
        display: inline-block;
      }

      #combobox-input {
        width: 100%;
        border-radius: var(--uui-size-1);
      }

      #scroll-container {
        max-height: var(--uui-combobox-popover-max-height, 500px);
        overflow-y: auto;
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
  private _input!: HTMLInputElement;

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
    demandCustomElement(this, 'uui-scroll-container');
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

  private _onFocus = () => '';

  private _onInput = (e: any) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.search = e.target.value;
    this._open();
  };

  private _onChange = (e: UUIComboboxListEvent) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    this._selectedElement = e.composedPath()[0] as UUIComboboxListOptionElement;
    const newValue = this._selectedElement?.value;

    if (this.value === newValue) return;

    this.value = this._selectedElement?.value || '';
    this._displayValue = this._selectedElement?.displayValue;
    this.search = this.value ? this.search : '';
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));

    this._close();
  };

  private _open = () => {
    if (this.open) return;
    this.open = true;
  };

  private _close = () => {
    if (!this.open) return;

    this.open = false;
    this._displayValue = this._selectedElement?.displayValue || '';

    this._input.value = this._displayValue;
    this.search = '';
  };

  private _onKeyDown = (e: KeyboardEvent) => {
    if (this.open === false && e.key === 'Enter') {
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      this._open();
    }
  };

  private _clear = (e: any) => {
    if (e.key && e.key !== 'Enter') return;

    e.preventDefault();
    e.stopImmediatePropagation();

    this._displayValue = '';
    this._input.value = this._displayValue;
    this.value = '';
    this.search = '';
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  private _renderInput = () => {
    return html` <uui-input
      slot="trigger"
      id="combobox-input"
      type="text"
      .value=${this._displayValue}
      .placeholder=${this._displayValue}
      @click=${this._open}
      @input=${this._onInput}
      @keydown=${this._onKeyDown}>
      <slot name="input-prepend" slot="prepend"></slot>
      ${this._renderClearButton()}
      <slot name="input-append" slot="append"></slot>
    </uui-input>`;
  };

  private _renderClearButton = () => {
    if (this.value || this.search) {
      return html`<uui-button
        @click=${this._clear}
        @keydown=${this._clear}
        label="clear"
        slot="append"
        compact
        style="height: 100%; --uui-button-padding-top-factor:0; --uui-button-padding-bottom-factor:0;">
        <uui-icon name="remove" .fallback=${iconRemove.strings[0]}></uui-icon>
      </uui-button>`;
    } else {
      return '';
    }
  };

  private _renderDropdown = () => {
    return html`<div id="dropdown" slot="popover">
      <uui-scroll-container id="scroll-container">
        <uui-combobox-list .value=${this.value} @change=${this._onChange}>
          <slot></slot>
        </uui-combobox-list>
      </uui-scroll-container>
    </div>`;
  };

  render() {
    return html`
      <uui-popover
        .open=${this.open}
        .margin=${10}
        @close=${() => this._close()}>
        ${this._renderInput()} ${this._renderDropdown()}
      </uui-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox': UUIComboboxElement;
  }
}

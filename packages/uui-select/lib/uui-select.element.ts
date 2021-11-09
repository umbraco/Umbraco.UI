import { css, html, LitElement } from 'lit';
import { property, query, queryAssignedNodes, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { UUICaretElement } from '@umbraco-ui/uui-caret/lib/uui-caret.element';

declare global {
  interface Option {
    name: string;
    value: string;
    group?: string;
    selected?: boolean;
  }
}
export class UUISelectElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        font-family: inherit;
      }

      #native {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-select-font-size, var(--uui-size-5));
        height: var(--uui-select-height, var(--uui-size-11));
        width: 100%;
        padding: var(--uui-select-padding-y, var(--uui-size-1))
          var(--uui-select-padding-x, var(--uui-size-2));
        color: currentColor;
        border-radius: 0;
        box-sizing: border-box;
        background-color: transparent;
        outline-color: #6ab4f0;
        border: 1px solid
          var(--uui-select-border-color, var(--uui-interface-border));
        transition: all 150ms ease;
      }

      #native:focus {
        outline-color: #6ab4f0;
      }

      #caret {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }
    `,
  ];

  private _toggleOpen() {
    this._open = !this._open;
  }

  @state()
  private _open = false;

  @property({ type: Array, attribute: false })
  options: Option[] = [];

  @property()
  placeholder = '';

  @property()
  value: any = '';

  @property({ type: Boolean })
  disabled = false;

  @query('#caret')
  caret?: UUICaretElement;

  protected setValue(e: Event): void {
    const target = e.target as HTMLSelectElement;

    if (e.target) this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('change', { bubbles: true, composed: true })
    );
  }

  @query('#native')
  private _select?: HTMLSelectElement;

  @queryAssignedNodes(undefined, true)
  _options: any;

  render() {
    return html` <select
      @change=${this.setValue}
      id="native"
      @focus=${this._toggleOpen}
      @blur=${this._toggleOpen}>
      <option disabled selected value="" hidden>${this.placeholder}</option>
      ${this.options.map(
        option =>
          html`<option
            value="${option.value}"
            selected="${ifDefined(option.selected)}">
            ${option.name}
          </option>`
      )}
    </select>`;
  }
}

import { css, html, LitElement } from 'lit';
import { property, query, queryAssignedNodes } from 'lit/decorators.js';

export class UUISelectElement extends LitElement {
  static styles = [
    css`
      label {
        display: block;
        position: relative;
      }
      select {
        -webkit-appearance: none;
        padding: 7px 40px 7px 12px;
        display: inline-block;
        height: 30px;
        padding: 3px 6px 1px 6px;
        font-family: inherit;
        font-size: 15px;
        color: inherit;
        border-radius: 0;
        box-sizing: border-box;
        background-color: var(
          --uui-text-field-background-color,
          var(--uui-interface-surface)
        );
        border: 1px solid
          var(--uui-text-field-border-color, var(--uui-interface-border));
        width: 100%;
        outline: none;
        transition: all 150ms ease;
      }

      option {
        color: #223254;
      }

      uui-caret {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }
    `,
  ];

  @property({ type: Array, attribute: false })
  options: any[] = [];

  @property()
  value: any = '';

  @property({ type: Boolean })
  disabled = false;

  // @query('uui-caret')
  // caret!: any;

  protected setValue(e: Event): void {
    const target = e.target as HTMLSelectElement;

    if (e.target) this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('change', { bubbles: true, composed: true })
    );
  }

  // private _toggleCaret() {
  //   this.caret.open = !this.caret.open;
  // }

  @query('#native')
  private _select?: HTMLSelectElement;

  @queryAssignedNodes(undefined, true)
  _options: any;

  private _addSlotToSelect() {
    const selectLastChild = this._select?.lastElementChild as HTMLOptionElement;

    while (this._select?.firstChild) {
      if (!selectLastChild.value) break;
      this._select.removeChild(selectLastChild);
    }
    for (const option of this._options) {
      this._select?.appendChild(option.cloneNode(true));
    }
  }

  render() {
    return html` <div style="display: none">
        <slot @slotchange="${this._addSlotToSelect}"></slot>
      </div>
      <select @change=${this.setValue} id="native"></select>`;
  }
}

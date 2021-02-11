import { LitElement, html, css, property, query } from 'lit-element';
import { UUIDropdownElement } from '../uui-dropdown/uui-dropdown.element';

/**
 *  @element uui-select
 *  @slot - for stuff
 */

//? shpould this have role of
export class UUISelectElement extends LitElement {
  static styles = [
    css`
      :host {
        font-family: inherit;
        --uui-select-widht: 200px;
        width: var(--uui-select-widht);
        display: inline-block;
        border: 1px solid var(--uui-interface-border);
        border-radius: var(--uui-size-border-radius);
      }

      uui-overflow-container {
        min-width: var(--uui-select-widht);
      }

      /* uui-carret {
        margin: 0.5em;
      } */

      #selected-value {
        display: inline-block;
        width: 100%;
        border: none;
        font-family: inherit;
        font-size: 1rem;
      }
    `,
  ];

  @query('uui-dropdown')
  dropdown!: UUIDropdownElement;

  @property({ type: Boolean, reflect: true, attribute: 'open' })
  isOpen = false;

  @property({ type: Boolean })
  autocomplete = false;

  render() {
    return html`<uui-dropdown
      ?open=${this.isOpen}
      @dropdown-close="${() => (this.isOpen = false)}"
      @dropdown-open="${() => (this.isOpen = true)}"
    >
      ${this.autocomplete
        ? html`<input id="selected-value" type="text" slot="input" />`
        : html`<span
            id="selected-value"
            slot="input"
            @click=${() => (this.isOpen = !this.isOpen)}
            >this.selected</span
          >`}

      <uui-carret slot="button" ?open=${this.isOpen}></uui-carret>
      <uui-overflow-container
        ><uui-select-list role="listbox"> <slot></slot> </uui-select-list
      ></uui-overflow-container>
    </uui-dropdown>`;
  }
}

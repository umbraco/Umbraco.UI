import { html, css, LitElement } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { UUIDropdownElement } from '../uui-dropdown/uui-dropdown.element';
import { UUIOverflowContainer } from '../uui-overflow-container/uui-overflow-container.element';
import { UUISelectOptionElement } from '../uui-select-option/uui-select-option.element';
import { UUISelectEvent } from './UUISelectEvent';
import { UUISelectOptionEvent } from '../uui-select-option/UUISelectOptionEvent';
/**
 *  @element uui-select
 *  @slot - for stuff
 */

export class UUISelectElement extends LitElement {
  static styles = [
    css`
      :host {
        font-family: inherit;
        /* TODO: I don't think we need a custom prop for this, as impl can just set width on the comp. */
        --uui-select-width: 200px;
        width: var(--uui-select-width);
        display: inline-block;
        border: 1px solid var(--uui-interface-border);
        border-radius: var(--uui-size-border-radius);
      }

      :host(:focus-within) {
        box-shadow: 0 0 2px 1px var(--uui-interface-border-focus);
      }

      uui-dropdown {
        display: flex;
        width: 100%;
        height: 100%;
      }

      uui-dropdown:focus {
        outline: none;
      }

      uui-overflow-container {
        min-width: var(--uui-select-width);
        outline: none;
      }

      button#selected-value {
        display: flex;
        align-items: center;

        width: 100%;

        font-family: inherit;
        font-size: 1rem;
        padding: var(--uui-size-small);
      }

      input#selected-value {
        width: 100%;

        font-family: inherit;
        font-size: 1rem;
        padding: var(--uui-size-small);
      }

      #caret {
        margin-left: auto;
      }

      button {
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        background-color: transparent;
      }

      #placeholder {
        font-style: italic;
        color: var(--uui-interface-contrast-disabled);
      }
    `,
  ];

  // TODO: assign with form etc.
  static readonly formAssociated = true;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeydown);
  }

  @query('uui-dropdown')
  dropdown!: UUIDropdownElement;

  @query('#selected-value')
  selectedValueElement!: HTMLButtonElement;

  private _open = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get open() {
    return this._open;
  }

  set open(newVal) {
    const oldVal = this._open;
    this._open = newVal;
    if (this.overflow && this.dropdown) {
      if (newVal) {
        if (this.input === false) {
          this.overflow.focus();
        }
      } else {
        this.selectedValueElement.focus();
      }
    }
    this.requestUpdate('open', oldVal);
  }

  @property({ type: String })
  label = '';

  @property({ type: String })
  title = '';

  @property({ type: Boolean, reflect: true })
  input = false;

  @property()
  placeholder = '';

  @query('uui-overflow-container')
  overflow!: UUIOverflowContainer;

  @query('slot') protected slotElement!: HTMLSlotElement;
  protected listElements!: UUISelectOptionElement[];

  //returns an Array of ListElements if they're in the slot or empty array
  protected getListElements(): UUISelectOptionElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(
            el => el instanceof UUISelectOptionElement
          ) as UUISelectOptionElement[])
      : [];
  }

  protected onSlotChange() {
    if (this.listElements) {
      this.listElements.forEach(el => {
        el.removeEventListener(
          'change',
          this.onListElementChange as EventListener
        );
      });
    }
    this.listElements =
      (this.slotElement
        .assignedElements({ flatten: true })
        .filter(
          el => el instanceof UUISelectOptionElement
        ) as UUISelectOptionElement[]) || [];
    this.updateSelectedElement();
    this.listElements.forEach(el => {
      el.addEventListener('change', this.onListElementChange as EventListener);
    });
  }

  private _value = '';
  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldVal = this._value;
    this._value = newValue;
    this.updateSelectedElement();
    this.deselectChildren();
    this.requestUpdate('value', oldVal);
  }

  @state()
  protected selectedElement: UUISelectOptionElement | null = null;
  protected updateSelectedElement() {
    this.selectedElement =
      this.listElements?.find(el => el.value === this._value) || null;
  }

  private _onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        if (!this.open) this.open = true;
        this.selectPreviousElement();
        break;
      }

      case 'ArrowDown': {
        e.preventDefault();

        if (!this.open) this.open = true;
        this.selectNextElement();
        break;
      }

      case ' ':
      case 'Enter': {
        e.preventDefault();
        this.open = !this.open;
        break;
      }

      case 'Escape': {
        e.preventDefault();
        if (this.open) this.open = false;
        break;
      }

      case 'Tab': {
        if (this.open) this.open = false;
        break;
      }

      case 'Home': {
        this.selectIndex(0);
        break;
      }

      case 'End': {
        this.selectIndex(this.listElements.length - 1);
        break;
      }
    }
  }

  private deselectChildren() {
    if (this.listElements) {
      const notValue = this.listElements.filter(el => el.value !== this._value);
      notValue.forEach(el => el.deselect());
    }
  }

  protected onListElementChange = (e: UUISelectOptionEvent) => {
    if (e.target.selected === true) {
      this.value = e.target.value;
      this._fireChangeEvent();
      this.open = false;
    }
  };

  private _fireChangeEvent() {
    this.dispatchEvent(new UUISelectEvent(UUISelectEvent.CHANGE));
  }

  protected onInputInput = () => {
    this.dispatchEvent(new UUISelectEvent(UUISelectEvent.INPUT));
  };
  protected onInputFocus = () => {
    this.open = true;
  };
  protected onDropdownClose = () => {
    this.open = false;
  };

  protected selectIndex(index: number) {
    if (this.listElements && index < this.listElements.length) {
      this.select(this.listElements[index]);
      this._fireChangeEvent();
    }
  }
  protected select(newSelection: UUISelectOptionElement) {
    newSelection.select();
    newSelection.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
    this.value = newSelection.value;
  }
  protected selectPreviousElement() {
    this.moveSelection(-1);
  }
  protected selectNextElement() {
    this.moveSelection(1);
  }
  private moveSelection(move: number) {
    let newSelection: UUISelectOptionElement | null = null;
    if (this.listElements && this.listElements.length > 0) {
      if (this.selectedElement) {
        const index: number = this.listElements.indexOf(this.selectedElement);
        if (index !== -1) {
          newSelection = this.getNextEnabledElement(index, index, move);
        }
      } else {
        newSelection = this.listElements[
          move > 0 ? 0 : this.listElements.length - 1
        ];
      }
      if (newSelection) {
        this.select(newSelection);
      }
    }
  }
  private getNextEnabledElement(
    originalIndex: number,
    index: number,
    move: number
  ): UUISelectOptionElement | null {
    let nextIndex = (index + move) % this.listElements.length;
    if (nextIndex < 0) {
      nextIndex += this.listElements.length;
    }
    if (originalIndex === nextIndex) {
      return null;
    }
    if (this.listElements[nextIndex].disabled !== true) {
      return this.listElements[nextIndex];
    }
    return this.getNextEnabledElement(originalIndex, nextIndex, move);
  }

  render() {
    return html`
      <uui-dropdown
        .open=${this.open}
        same-width
        position="bottom"
        .title="${this.title}"
        tabindex="0"
        role="combobox"
        aria-expanded=${this.open}
        aria-controls="list"
        @close=${this.onDropdownClose}
      >
        ${this.input
          ? html`
            <input
              id="input-field"
              type="text"
              @focus=${this.onInputFocus}
              @input=${this.onInputInput}
              aria-label="${this.label}"
            ></input>
          `
          : html`
              <button
                id="selected-value"
                type="button"
                @click="${() => {
                  console.log('click');
                  this.open = !this.open;
                }}"
                aria-label="${this.label}"
              >
                ${this.selectedElement
                  ? html`<span>${this.selectedElement.label}</span>`
                  : html`<span id="placeholder">${this.placeholder}</span>`}
                <uui-caret id="caret" ?open=${this._open}></uui-caret>
              </button>
            `}

        <uui-overflow-container
          slot="dropdown"
          role="listbox"
          tabindex="${this.open ? '0' : '-1'}"
          aria-activedescendant="TODO"
          @change=${this.onListElementChange}
        >
          <slot @slotchange=${this.onSlotChange}></slot>
        </uui-overflow-container>
      </uui-dropdown>
    `;
  }
}

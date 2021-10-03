import { LitElement, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUISelectOptionEvent } from './UUISelectOptionEvent';

/**
 *  @element uui-list-item
 *
 */

//TODO add the deselect method

export class UUISelectOptionElement extends LabelMixin('', LitElement) {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;

        font-size: 1rem;
        font-family: inherit;
        color: var(--uui-interface-contrast);

        box-sizing: border-box;
        cursor: pointer;

        padding: 0.5em;
        background-color: var(--uui-interface-surface);
      }

      :host(:hover) {
        background-color: var(--uui-interface-surface-hover);
      }

      :host([selected]) {
        background-color: var(--uui-interface-select);
        color: var(--uui-interface-select-contrast);
      }

      #list-item {
        display: flex;
        align-items: center;
      }
    `,
  ];

  // Do we need an id and do we need to ensure an unique id?
  static UniqueIdCounter = 1;

  @property({ reflect: true })
  id = `uui-select-option-${UUISelectOptionElement.UniqueIdCounter++}`;

  @property({ type: String })
  value = '';

  private _disabled = false;
  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this._disabled;
  }

  set disabled(newVal) {
    const oldVal = this._disabled;
    this._disabled = newVal;
    if (newVal) {
      this.setAttribute('aria-hidden', 'true');
    }
    this.requestUpdate('disabled', oldVal);
  }

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'option');
    if (!this.hasAttribute('aria-selected'))
      this.setAttribute('aria-selected', 'false');
    if (!this.value) {
      console.warn(this.tagName + ' needs a `value`');
    }
  }

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  focused = false;

  @query('#list-item') protected listItem!: HTMLButtonElement;

  private handleClick(e: Event) {
    e.stopPropagation();
    this.select();
    this.dispatchEvent(new UUISelectOptionEvent(UUISelectOptionEvent.CHANGE));
  }

  public select() {
    this.selected = true;
    if (!this.disabled) {
      //this.setAttribute('tabindex', '0');
      this.setAttribute('aria-selected', 'true');
      this.focus();
    }
  }

  public deselect() {
    this.selected = false;
    // this.setAttribute('tabindex', '-1');
    this.setAttribute('aria-selected', 'false');
  }

  render() {
    return this.renderLabel();
  }
}

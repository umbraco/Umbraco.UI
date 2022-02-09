import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';

/**
 * Label element for Custom Element
 * @element uui-label
 * @slot - for the label text.
 */
@defineElement('uui-label')
export class UUILabelElement extends LitElement {
  static styles = [
    css`
      :host([for]) {
        cursor: pointer;
      }
      :host([disabled]) {
        cursor: default;
      }
    `,
  ];

  /**
   * Disables the label.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Define the related element to this label.
   * @type {string | HTMLElement}
   * @attr for
   * @default null
   */
  @property({ reflect: false, attribute: true })
  for: string | HTMLElement | null = null;

  constructor() {
    super();
    this.addEventListener('click', this._onClick);
  }

  private _onClick() {
    if (this.disabled) return;

    const el = this.getForElement();
    if (el) {
      el.focus();
      el.click();
    }
  }

  protected getForElement(): HTMLElement | null {
    if (typeof this.for === 'string') {
      const scope = this.getRootNode();
      return (scope as DocumentFragment)?.getElementById(this.for) || null;
    }
    return this.for || null;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-label': UUILabelElement;
  }
}

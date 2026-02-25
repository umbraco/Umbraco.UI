import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Label element for Custom Element
 * @element uui-label
 * @slot - for the label text.
 * @cssprop --uui-validation-color - Color property for the required asterisk.
 */
export class UUILabelElement extends LitElement {
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
  @property({ reflect: true, attribute: true })
  for: string | HTMLElement | null = null;

  /**
   * Highlight that the related element is required.
   * @type {boolean}
   * @attr required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

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
    return html`
      <slot></slot>
      ${this.required ? html`<div id="required">*</div>` : ''}
    `;
  }

  static styles = [
    css`
      :host {
        font-weight: 700;
      }
      :host([for]) {
        cursor: pointer;
      }
      :host([disabled]) {
        cursor: default;
      }
      #required {
        display: inline;
        color: var(--uui-color-danger);
        font-weight: 900;
      }
    `,
  ];
}

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Label element for Custom Element
 * @element uui-label
 * @slot - for the label text.
 */
export class UUILabelElement extends LitElement {
  static styles = [
    css`
      :host {
        /* Styles goes here */
      }
    `,
  ];

  @property({ reflect: false, attribute: true })
  for: string | HTMLElement | null = null;

  constructor() {
    super();
    this.addEventListener('click', this.onFocusFor);
  }

  private onFocusFor() {
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
    console.log(this.for);
    return this.for || null;
  }

  render() {
    return html`<slot></slot>`;
  }
}

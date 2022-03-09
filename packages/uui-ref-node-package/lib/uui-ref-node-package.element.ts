import { UUIRefNodeElement } from '@umbraco-ui/uui-ref-node/lib';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { html } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  @element uui-ref-node-package
 *  @fires {UUIRefEvent} open - fires when the ref title is clicked
 *  @fires {UUIRefEvent} selected - fires when the ref is selected
 *  @fires {UUIRefEvent} unselected - fires when the ref is unselected
 *  @description - Component for displaying a reference to a Package node.
 */

@defineElement('uui-ref-node-package')
export class UUIRefNodePackageElement extends UUIRefNodeElement {
  static styles = [...UUIRefNodeElement.styles];

  protected fallbackIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M161.08 106.29l-70.073 40.452 165.498 95.545 70.076-40.453L161.08 106.29zm259.851 41.077L255.435 51.815l-63.578 36.709 165.499 95.542 63.575-36.699zm-150.11 122.19V459.43l164.966-95.238V174.32l-164.966 95.237zM75.082 364.191l164.959 95.234V268.32L75.082 173.09v191.101z"></path></svg>';

  /**
   * Package version
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  version = '';

  /**
   * Package author
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  author = '';

  protected renderDetail() {
    const details: string[] = [];
    if (this.detail !== '') {
      details.push(this.detail);
    }
    if (this.version !== '') {
      details.push(this.version);
    }
    if (this.author !== '') {
      details.push(this.author);
    }
    return html`<small id="detail"
      >${details.join(' | ')}<slot name="detail"></slot
    ></small>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-package': UUIRefNodePackageElement;
  }
}

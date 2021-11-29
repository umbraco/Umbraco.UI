import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIRefNodeElement } from '@umbraco-ui/uui-ref-node/lib/uui-ref-node.element';

/**
 *  @element uui-ref-node-package
 *  @fires {UUIRefEvent} click-title - fires when the ref title is clicked
 *  @description - Component for displaying a reference to a Package node.
 */

export class UUIRefNodePackageElement extends UUIRefNodeElement {
  static styles = [...UUIRefNodeElement.styles];

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

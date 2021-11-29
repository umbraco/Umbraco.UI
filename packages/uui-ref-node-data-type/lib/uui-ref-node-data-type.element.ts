import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIRefNodeElement } from '@umbraco-ui/uui-ref-node/lib/uui-ref-node.element';

/**
 *  @element uui-ref-node-data-type
 *  @fires {UUIRefEvent} click-title - fires when the ref title is clicked
 *  @description - Component for displaying a reference to a Data Type node.
 */

export class UUIRefNodeDataTypeElement extends UUIRefNodeElement {
  static styles = [...UUIRefNodeElement.styles];

  /**
   * Alias
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  alias = '';

  protected renderDetail() {
    const details: string[] = [];

    if (this.alias !== '') {
      details.push(this.alias);
    }
    if (this.detail !== '') {
      details.push(this.detail);
    }
    return html`<small id="detail"
      >${details.join(' | ')}<slot name="detail"></slot
    ></small>`;
  }
}

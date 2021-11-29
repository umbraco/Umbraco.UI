import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIRefNodeElement } from '@umbraco-ui/uui-ref-node/lib/uui-ref-node.element';

/**
 *  @element uui-ref-node-member
 *  @fires {UUIRefEvent} click-title - fires when the ref title is clicked
 *  @description - Component for displaying a reference to a Member node.
 */

export class UUIRefNodeMemberElement extends UUIRefNodeElement {
  static styles = [...UUIRefNodeElement.styles];

  /**
   * Group name
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String, attribute: 'group-name' })
  groupName = '';

  protected renderDetail() {
    const details: string[] = [];
    if (this.detail !== '') {
      details.push(this.detail);
    }
    if (this.groupName !== '') {
      details.push(this.groupName);
    }
    return html`<small id="detail"
      >${details.join(' | ')}<slot name="detail"></slot
    ></small>`;
  }
}

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIRefNodeElement } from '@umbraco-ui/uui-ref-node/lib/uui-ref-node.element';

/**
 *  @element uui-ref-node-user
 *  @fires {UUIRefEvent} click-title - fires when the ref title is clicked
 *  @description - Component for displaying a reference to a user node.
 */

export class UUIRefNodeUserElement extends UUIRefNodeElement {
  static styles = [...UUIRefNodeElement.styles];

  @property({ type: String, attribute: 'group-name' })
  groupName = '';

  constructor() {
    super();
    //TODO: replace with user icon.
    if (this.icon === '') {
      this.icon = 'bug';
    }
  }

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

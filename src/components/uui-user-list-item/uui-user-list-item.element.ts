import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUINodeListItemElement } from '../uui-node-list-item/uui-node-list-item.element';

/**
 *  @element uui-user-list-item
 *  @fires {UUIListItemEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a user.
 */

export class UUIUserListItemElement extends UUINodeListItemElement {
  static styles = [...UUINodeListItemElement.styles];

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

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIListItemNodeElement } from '@umbraco-ui/uui-list-item-node/lib/uui-list-item-node.element';

/**
 *  @element uui-list-item-user
 *  @fires {UUIListItemEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a user.
 */

export class UUIListItemUserElement extends UUIListItemNodeElement {
  static styles = [...UUIListItemNodeElement.styles];

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

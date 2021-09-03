import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUINodeListItemElement } from '../uui-node-list-item/uui-node-list-item.element';

/**
 *  @element uui-datatype-list-item
 *  @fires {UUIListItemEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a node.
 */

export class UUIPackageListItemElement extends UUINodeListItemElement {
  static styles = [...UUINodeListItemElement.styles];

  @property({ type: String })
  version = '';

  @property({ type: String })
  author = '';

  constructor() {
    super();
    //TODO: replace with package icon.
    if (this.icon === '') {
      this.icon = 'bug';
    }
  }

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

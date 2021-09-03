import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUINodeListItemElement } from '../uui-node-list-item/uui-node-list-item.element';

/**
 *  @element uui-document-type-list-item
 *  @fires {UUIListItemEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a document type(Content Type, Media Type, Element Type etc.).
 */

export class UUIDocumentTypeListItemElement extends UUINodeListItemElement {
  static styles = [...UUINodeListItemElement.styles];

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

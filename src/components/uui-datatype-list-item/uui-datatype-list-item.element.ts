import { property } from 'lit/decorators';
import { UUINodeListItemElement } from '../uui-node-list-item/uui-node-list-item.element';

/**
 *  @element uui-datatype-list-item
 *  @fires {UUIListItemEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a node.
 */

export class UUIDataTypeListItemElement extends UUINodeListItemElement {
  static styles = [...UUINodeListItemElement.styles];

  @property({ type: String })
  get alias() {
    return this.detail;
  }

  set alias(newValue) {
    const oldValue = newValue;
    this.detail = newValue;
    this.requestUpdate('detail', oldValue);
  }
}

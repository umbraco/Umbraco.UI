import { UUINodeListItemElement } from '../uui-node-list-item/uui-node-list-item.element';

/**
 *  @element uui-user-list-item
 *  @fires {UUIListItemEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a user.
 */

export class UUIFormListItemElement extends UUINodeListItemElement {
  static styles = [...UUINodeListItemElement.styles];

  constructor() {
    super();
    //TODO: replace with form icon.
    if (this.icon === '') {
      this.icon = 'bug';
    }
  }
}

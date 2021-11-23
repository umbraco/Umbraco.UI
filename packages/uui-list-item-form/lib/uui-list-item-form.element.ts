import { UUIListItemNodeElement } from '@umbraco-ui/uui-list-item-node/lib/uui-list-item-node.element';

/**
 *  @element uui-list-item-user
 *  @fires {UUIListItemEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a user.
 */

export class UUIListItemFormElement extends UUIListItemNodeElement {
  static styles = [...UUIListItemNodeElement.styles];

  constructor() {
    super();
    //TODO: replace with form icon.
    if (this.icon === '') {
      this.icon = 'bug';
    }
  }
}

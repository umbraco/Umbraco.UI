import { UUIRefNodeElement } from '@umbraco-ui/uui-ref-node/lib/uui-ref-node.element';

/**
 *  @element uui-ref-node-form
 *  @fires {UUIRefEvent} click-title - fires when the ref title is clicked
 *  @description - Component for displaying a reference to a form node.
 */

export class UUIRefNodeFormElement extends UUIRefNodeElement {
  static styles = [...UUIRefNodeElement.styles];

  constructor() {
    super();
    //TODO: replace with form icon.
    if (this.icon === '') {
      this.icon = 'bug';
    }
  }
}

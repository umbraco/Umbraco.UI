import { UUIRefNodeElement } from '@umbraco-ui/uui-ref-node/lib';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { html } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  @element uui-ref-node-document-type
 *  @fires {UUIRefEvent} open - fires when the ref title is clicked
 *  @fires {UUIRefEvent} selected - fires when the ref is selected
 *  @fires {UUIRefEvent} unselected - fires when the ref is unselected
 *  @description - Component for displaying a reference to a Content type(Document Type, Media Type, Element Type etc.) node.
 */

@defineElement('uui-ref-node-document-type')
export class UUIRefNodeDocumentTypeElement extends UUIRefNodeElement {
  static styles = [...UUIRefNodeElement.styles];

  protected fallbackIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M49.035 60.434h413.93v33.592H49.035zm0 82.005h86.578v86.577H49.035zm163.677 0h86.576v86.577h-86.576zm163.676 0h86.576v86.577h-86.576zM49.035 282.984h413.93v33.593H49.035zm0 82.006h86.578v86.576H49.035zm163.677 0h86.576v86.576h-86.576zm163.676 0h86.576v86.576h-86.576z"></path></svg>';

  /**
   * Alias
   * @type {string}
   * @attr
   * @default ''
   */
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

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node-document-type': UUIRefNodeDocumentTypeElement;
  }
}

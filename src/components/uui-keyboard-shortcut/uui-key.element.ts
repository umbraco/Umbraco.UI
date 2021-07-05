import { css, html, LitElement } from 'lit';
import { queryAssignedNodes } from 'lit/decorators.js';
export class UUIKeyElement extends LitElement {
  static styles = [
    css`
      :host {
        background: var(--uui-interface-surface, #fff);
        border: 1px solid var(--uui-interface-border, #d8d7d9);
        color: #515054;
        font-family: inherit;
        font-size: var(--uui-size-small, 12px);
        border-radius: 5px;
        margin: 0px 5px;
        padding: 1px 7px;
        box-sizing: border-box;
        user-select: none;
      }
    `,
  ];

  @queryAssignedNodes()
  private slotNodes!: NodeList;

  private _changeCase() {
    console.log(this.slotNodes);
    if (this.slotNodes[0] !== null && this.slotNodes[0].nodeValue) {
      this.slotNodes.forEach(node => {
        if (node.nodeName === '#text' && node.nodeValue)
          node.nodeValue = node.nodeValue?.toLowerCase();
      });
    }
  }

  render() {
    return html`<slot @slotchange=${this._changeCase}></slot>`;
  }
}

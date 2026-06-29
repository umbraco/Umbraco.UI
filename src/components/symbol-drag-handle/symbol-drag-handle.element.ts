import { css, html, LitElement } from 'lit';
import { LabelMixin } from '../../internal/index.js';
import '../icon/icon.js';

/**
 * @element uui-symbol-drag-handle
 */
export class UUISymbolDragHandleElement extends LabelMixin('', LitElement) {
  render() {
    return html`<uui-icon name="drag" aria-hidden="true"></uui-icon>`;
  }

  static override readonly styles = [
    css`
      :host {
        cursor: grab;
      }
      :host:active {
        cursor: grabbing;
      }
    `,
  ];
}

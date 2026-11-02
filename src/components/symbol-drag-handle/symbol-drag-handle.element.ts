import { css, html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LabelMixin } from '../../internal/index.js';
import '../icon/icon.js';

/**
 * @element uui-symbol-drag-handle
 * @property {string} label - intended as the accessible name of the drag handle. Not rendered visually. Currently has no effect: it is passed as aria-label to the inner icon, which removes it and is hidden from assistive technology.
 */
export class UUISymbolDragHandleElement extends LabelMixin('', LitElement) {
  render() {
    return html`<uui-icon
      name="drag"
      aria-label=${ifDefined(this.label)}></uui-icon>`;
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

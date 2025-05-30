import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @element uui-drag-handle
 */
@defineElement('uui-drag-handle')
export class UUIDragHandleElement extends LabelMixin('', LitElement) {
  render() {
    return html`<uui-icon
      name="drag"
      aria-label=${ifDefined(this.label)}></uui-icon>`;
  }

  static styles = [
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

declare global {
  interface HTMLElementTagNameMap {
    'uui-drag-handle': UUIDragHandleElement;
  }
}

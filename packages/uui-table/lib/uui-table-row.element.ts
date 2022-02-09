import {
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { queryAssignedNodes } from 'lit/decorators.js';

import { UUITableCellElement } from './uui-table-cell.element';

/**
 *  Table row element with option to set is as selectable. Parent for uui-table-cell. Must be a child of uui-table.
 *  @element uui-table-row
 *  @slot for <uui-table-cell> elements that should be in the row.
 */
@defineElement('uui-table-row')
export class UUITableRowElement extends SelectOnlyMixin(
  SelectableMixin(LitElement)
) {
  static styles = [
    css`
      :host {
        display: table-row;
        position: relative;
      }

      :host([selectable]) {
        cursor: pointer;
      }

      :host([selected]) {
        outline: 2px solid var(--uui-interface-select);
        outline-offset: -3px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'row');
  }

  @queryAssignedNodes(undefined, true, 'uui-table-cell')
  private slotCellNodes?: UUITableCellElement[];

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('selectOnly')) this.updateChildSelectOnly();
  }

  private updateChildSelectOnly() {
    if (this.slotCellNodes) {
      this.slotCellNodes.forEach(el => {
        el.disableChildInteraction = this.selectOnly;
      });
    }
  }

  render() {
    return html` <slot @slotchanged=${this.updateChildSelectOnly}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-row': UUITableRowElement;
  }
}

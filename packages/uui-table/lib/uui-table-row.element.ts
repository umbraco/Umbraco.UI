import {
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { queryAssignedElements } from 'lit/decorators.js';

import { UUITableCellElement } from './uui-table-cell.element';

/**
 *  Table row element with option to set is as selectable. Parent for uui-table-cell. Must be a child of uui-table.
 *  @element uui-table-row
 *  @slot for <uui-table-cell> elements that should be in the row.
 *  @cssprop --uui-table-row-color-selected - overwrite the color of the selected row
 */
@defineElement('uui-table-row')
export class UUITableRowElement extends SelectOnlyMixin(
  SelectableMixin(LitElement),
) {
  constructor() {
    super();

    // hide outline if mouse-interaction:
    let hadMouseDown = false;
    this.addEventListener('blur', () => {
      if (hadMouseDown === false) {
        this.style.setProperty('--uui-show-focus-outline', '1');
      }
      hadMouseDown = false;
    });
    this.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
      hadMouseDown = true;
    });
    this.addEventListener('mouseup', () => {
      hadMouseDown = false;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'row');
  }

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-table-cell, [uui-table-cell], [role=cell]',
  })
  private slotCellNodes?: unknown[];

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('selectOnly')) this.updateChildSelectOnly();
  }

  private updateChildSelectOnly() {
    if (this.slotCellNodes) {
      this.slotCellNodes.forEach(el => {
        if (this.elementIsTableCell(el)) {
          el.disableChildInteraction = this.selectOnly;
        }
      });
    }
  }

  private elementIsTableCell(element: unknown): element is UUITableCellElement {
    return element instanceof UUITableCellElement;
  }

  render() {
    return html` <slot @slotchanged=${this.updateChildSelectOnly}></slot> `;
  }

  static styles = [
    css`
      :host {
        display: table-row;
        position: relative;
        outline-offset: -3px;
      }

      :host([selectable]) {
        cursor: pointer;
      }

      :host(:focus) {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }
      :host([selected]) {
        outline: 2px solid
          var(--uui-table-row-color-selected, var(--uui-color-selected));
      }
      :host([selected]:focus) {
        outline-color: var(--uui-color-focus);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-row': UUITableRowElement;
  }
}

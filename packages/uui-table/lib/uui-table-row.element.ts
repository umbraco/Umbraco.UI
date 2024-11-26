import {
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { ref } from 'lit/directives/ref.js';
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
    const slotCellNodes = this.slotCellNodes;
    if (slotCellNodes) {
      slotCellNodes.forEach(el => {
        if (el instanceof UUITableCellElement) {
          el.disableChildInteraction = this.selectOnly;
        }
      });
    }
  }

  #selectAreaChanged(selectArea?: Element | undefined) {
    this.selectableTarget = selectArea || this;
  }

  render() {
    return html`
      <slot id="open-part" @slotchanged=${this.updateChildSelectOnly}></slot>
      <div id="select-border" ${ref(this.#selectAreaChanged)}>
        <div id="select-top"></div>
        <div id="select-right"></div>
        <div id="select-bottom"></div>
        <div id="select-left"></div>
      </div>
    `;
  }

  static styles = [
    css`
      :host {
        display: table-row;
        position: relative;
        outline-offset: -3px;
      }

      :host(:focus) {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      :host([selectable]) #select-border {
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host([selectable]) #select-border::after {
        content: '';
        position: absolute;
        z-index: 20;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid var(--uui-color-selected);
        border-radius: calc(var(--uui-border-radius) + 2px);
        pointer-events: none;
        box-shadow:
          0 0 4px 0 var(--uui-color-selected),
          inset 0 0 2px 0 var(--uui-color-selected);
      }

      :host([selectable]) #select-border #select-top,
      :host([selectable]) #select-border #select-right,
      :host([selectable]) #select-border #select-bottom,
      :host([selectable]) #select-border #select-left {
        position: absolute;
        z-index: 2;
        top: 1px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        cursor: pointer;
        pointer-events: auto;
      }
      :host([selectable]) #select-border #select-top {
        height: var(--uui-size-space-4);
        bottom: unset;
      }
      :host([selectable]) #select-border #select-right {
        width: var(--uui-size-space-4);
        left: unset;
      }
      :host([selectable]) #select-border #select-bottom {
        height: var(--uui-size-space-4);
        top: unset;
      }
      :host([selectable]) #select-border #select-left {
        width: var(--uui-size-space-4);
        right: unset;
      }

      :host([selected]) #select-border {
        opacity: 1;
      }
      :host([selectable]:not([selected]):hover) #select-border {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover) #select-border {
        opacity: 0.8;
      }

      :host([selectable]:not([selected])) #open-part:hover + #select-border {
        opacity: 0;
      }
      :host([selectable][selected]) #open-part:hover + #select-border {
        opacity: 1;
      }

      :host([selectable]:not([selected]):hover) #select-border::after {
        animation: not-selected--hover 1.2s infinite;
      }
      @keyframes not-selected--hover {
        0%,
        100% {
          opacity: 0.66;
        }
        50% {
          opacity: 1;
        }
      }

      :host([selectable][selected]:hover) #select-border::after {
        animation: selected--hover 1.4s infinite;
      }
      @keyframes selected--hover {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.66;
        }
      }
      :host([selectable]) #open-part:hover + #select-border::after {
        animation: none;
      }

      :host([select-only]) *,
      :host([select-only]) ::slotted(*) {
        pointer-events: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-row': UUITableRowElement;
  }
}

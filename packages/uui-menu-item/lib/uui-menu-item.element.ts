import { LitElement, css, html } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import {
  ActiveMixin,
  LabelMixin,
  SelectableMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { UUIMenuItemEvent } from './UUIMenuItemEvent';

/**
 *  @element uui-menu-item
 *  @cssprop --uui-menu-item-indent - set indentation of the menu items
 *  @property label - This functions both as the visible label as well as the aria label.
 *  @fires {UUIMenuItemEvent} show-children - fires when the expand icon is clicked to show nested menu items
 *  @fires {UUIMenuItemEvent} hide-children - fires when the expend icon is clicked to hide nested menu items
 *  @fires {UUIMenuItemEvent} click-label - fires when the label is clicked
 *  @slot default slot for nested menu items
 *  @slot icon - icon area
 *  @slot actions - actions area
 *
 */
@defineElement('uui-menu-item')
export class UUIMenuItemElement extends SelectableMixin(
  ActiveMixin(LabelMixin('label', LitElement))
) {
  static styles = [
    css`
      :host {
        display: block;
        background-color: var(--uui-interface-surface);
        /** consider transparent. */
        --uui-menu-item-child-indent: calc(var(--uui-menu-item-indent, 0) + 1);
      }

      #menu-item {
        position: relative;
        display: flex;
        align-items: stretch;
        padding-left: calc(var(--uui-menu-item-indent, 0) * var(--uui-size-4));

        display: grid;
        grid-template-columns: var(--uui-size-8) 1fr;
        grid-template-rows: 1fr;
        white-space: nowrap;
      }

      button {
        display: block;
        font-family: inherit;

        padding: 0;
        text-align: left;
        box-shadow: none;
        border: none;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        z-index: 1;
        /* padding: 0 var(--uui-size-base-unit) 0 var(--uui-size-base-unit); */
        min-height: var(--uui-size-12);
      }
      /* button:hover {
        color: var(--uui-interface-contrast-hover);
      } */

      #label-button {
        flex-grow: 1;
        grid-column-start: 2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #caret-button + #label-button {
        padding-left: 0;
      }

      #caret-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #label-button-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      #label-button:hover + #label-button-background,
      #caret-button:hover ~ #label-button-background {
        background-color: var(--uui-interface-surface-hover);
      }

      #actions-container {
        opacity: 0;
        transition: opacity 120ms;
        grid-column-start: 3;
      }
      #menu-item:hover #actions-container {
        opacity: 1;
      }

      #loader {
        position: absolute;
        width: 100%;
        bottom: 0;
      }

      #icon {
        font-size: 16px;
        margin-bottom: var(--uui-size-1);
        margin-right: var(--uui-size-2);
        display: inline-block;
      }

      :host([disabled]) #label-button {
        color: var(--uui-interface-surface-contrast-disabled);
      }
      :host([disabled]) #label-button-background {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-surface-disabled);
      }

      :host([active]) button {
        color: var(--uui-interface-active-contrast);
      }
      :host([active]) button:hover {
        color: var(--uui-interface-active-contrast-hover);
      }
      :host([active]) #label-button-background {
        background-color: var(--uui-interface-active);
      }
      :host([active]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-active-hover);
      }
      :host([active][disabled]) #label-button {
        color: var(--uui-interface-active-contrast-disabled);
        background-color: var(--uui-interface-active-disabled);
      }

      :host([selected]) button {
        color: var(--uui-interface-select-contrast);
      }
      :host([selected]) button:hover {
        color: var(--uui-interface-select-contrast-hover);
      }
      :host([selected]) #label-button-background {
        background-color: var(--uui-interface-select);
      }
      :host([selected]) #label-button:hover + #label-button-background,
      :host([selected]) #caret-button:hover ~ #label-button-background {
        background-color: var(--uui-interface-select-hover);
      }
      :host([selected][disabled]) #label-button {
        color: var(--uui-interface-select-contrast-disabled);
        background-color: var(--uui-interface-select-disabled);
      }

      slot:not([name]) {
        position: relative;
        display: block;
        width: 100%;
      }
      slot:not([name]) {
        --uui-menu-item-indent: var(--uui-menu-item-child-indent);
      }

      slot[name='actions'] {
        display: flex;
        align-items: center;
        --uui-button-height: calc(var(--uui-size-base-unit) * 4);
        margin-right: var(--uui-size-base-unit);
      }
    `,
  ];

  /**
   * Disables the menu item, changes the looks of it and prevents if from emitting the click event
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Controls if nested items should be shown.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-children' })
  public showChildren = false;

  // TODO: Should this be a getter that just checks on its own if there is any children?
  /**
   * Shows/hides the caret.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, attribute: 'has-children' })
  public hasChildren = false;

  /**
   * Shows/hides the loading indicator
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, attribute: 'loading' })
  public loading = false;

  private onCaretClicked() {
    this.showChildren = !this.showChildren;
    const eventName: string = this.showChildren
      ? UUIMenuItemEvent.SHOW_CHILDREN
      : UUIMenuItemEvent.HIDE_CHILDREN;
    const event = new UUIMenuItemEvent(eventName);
    this.dispatchEvent(event);
  }

  private onLabelClicked() {
    const event = new UUIMenuItemEvent(UUIMenuItemEvent.CLICK_LABEL);
    this.dispatchEvent(event);
  }

  @state()
  private iconSlotHasContent = false;

  private iconSlotChanged(e: any): void {
    this.iconSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    return html`
      <div id="menu-item" aria-label="menuitem" role="menuitem">
        ${this.hasChildren
          ? html`<button id="caret-button" @click=${this.onCaretClicked}>
              <uui-symbol-expand ?open=${this.showChildren}></uui-symbol-expand>
            </button>`
          : ''}
        <button
          id="label-button"
          @click=${this.onLabelClicked}
          ?disabled=${this.disabled}
          aria-label="${this.label}">
          <slot
            name="icon"
            id="icon"
            style=${this.iconSlotHasContent ? '' : 'display: none;'}
            @slotchange=${this.iconSlotChanged}></slot>
          ${this.renderLabel()}
        </button>
        <div id="label-button-background"></div>
        <slot id="actions-container" name="actions"></slot>
        ${this.loading
          ? html`<uui-loader-bar id="loader"></uui-loader-bar>`
          : ''}
      </div>
      ${this.showChildren ? html`<slot></slot>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-menu-item': UUIMenuItemElement;
  }
}

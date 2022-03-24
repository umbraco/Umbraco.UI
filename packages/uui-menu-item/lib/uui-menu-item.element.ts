import {
  ActiveMixin,
  LabelMixin,
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { UUIMenuItemEvent } from './UUIMenuItemEvent';

/**
 *  @element uui-menu-item
 *  @cssprop --uui-menu-item-indent - set indentation of the menu items
 *  @fires {UUIMenuItemEvent} show-children - fires when the expand icon is clicked to show nested menu items
 *  @fires {UUIMenuItemEvent} hide-children - fires when the expend icon is clicked to hide nested menu items
 *  @fires {UUIMenuItemEvent} click-label - fires when the label is clicked
 *  @slot - nested menu items go here
 *  @slot icon - icon area
 *  @slot actions - actions area
 *  @slot label - area to place the label
 */
@defineElement('uui-menu-item')
export class UUIMenuItemElement extends SelectOnlyMixin(
  SelectableMixin(ActiveMixin(LabelMixin('label', LitElement)))
) {
  static styles = [
    css`
      :host {
        display: block;
        --uui-menu-item-child-indent: calc(var(--uui-menu-item-indent, 0) + 1);

        user-select: none;
      }

      #menu-item {
        position: relative;

        padding-left: calc(var(--uui-menu-item-indent, 0) * var(--uui-size-4));

        display: grid;
        grid-template-columns: var(--uui-size-8) 1fr;
        grid-template-rows: 1fr;
        white-space: nowrap;
      }

      button {
        display: inline-flex;
        align-items: center;

        font-family: inherit;
        font-size: inherit;

        padding: 0;
        text-align: left;
        border: none;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        min-height: var(--uui-size-12);
        z-index: 1;
      }
      /* button:hover {
        color: var(--uui-interface-contrast-hover);
      } */

      #label-button {
        flex-grow: 1;
        grid-column-start: 2;
        white-space: nowrap;
        overflow: hidden;

        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: currentColor;
        min-height: var(--uui-size-12);
        z-index: 1;
      }

      #label-button .label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span#label-button {
        pointer-events: none; /* avoid hovering state on this. */
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
      :host(:not([disabled])) #menu-item:hover #actions-container,
      :host(:not([disabled])) #menu-item:focus #actions-container,
      :host(:not([disabled])) #menu-item:focus-within #actions-container {
        opacity: 1;
      }

      #loader {
        position: absolute;
        width: 100%;
        bottom: 0;
      }

      #icon {
        display: inline-flex;
        font-size: 16px;
        margin-right: var(--uui-size-2);
      }

      #badge {
        font-size: 12px;
        --uui-badge-position: relative;
        --uui-badge-position: auto;
        display: block;
        margin-left: 6px;
      }

      :host([disabled]) {
        color: var(--uui-interface-surface-contrast-disabled);
      }
      :host([disabled]) #label-button-background {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-surface-disabled);
      }

      :host([active]) {
        color: var(--uui-interface-active-contrast);
      }
      :host([active]) #label-button:hover {
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

      :host([selected]) {
        color: var(--uui-interface-select-contrast);
      }
      :host([selected]) #label-button:hover {
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
   * Disables the menu item, changes the looks of it and prevents it from emitting the click event
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

  /**
   * Set an href, this will turns the label into a anchor tag.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public href?: string;

  /**
   * Set an anchor tag target, only used when using href.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public target?: '_blank' | '_parent' | '_self' | '_top';

  @state()
  private iconSlotHasContent = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'menu');
  }

  private iconSlotChanged(e: any): void {
    this.iconSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

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

  private _renderLabelInside() {
    return html` <slot
        name="icon"
        id="icon"
        style=${this.iconSlotHasContent ? '' : 'display: none;'}
        @slotchange=${this.iconSlotChanged}></slot>
      ${this.renderLabel()}
      <slot name="badge" id="badge"> </slot>`;
  }

  private _renderLabelAsAnchor() {
    if (this.disabled) {
      return html` <span id="label-button">
        ${this._renderLabelInside()}
      </span>`;
    }
    return html` <a
      id="label-button"
      href=${ifDefined(this.href)}
      target=${ifDefined(this.target || undefined)}
      rel=${ifDefined(this.target === '_blank' ? 'noopener' : undefined)}
      @click=${this.onLabelClicked}
      ?disabled=${this.disabled}
      aria-label="${this.label}">
      ${this._renderLabelInside()}
    </a>`;
  }

  private _renderLabelAsButton() {
    return html` <button
      id="label-button"
      @click=${this.onLabelClicked}
      ?disabled=${this.disabled}
      aria-label="${this.label}">
      ${this._renderLabelInside()}
    </button>`;
  }

  render() {
    return html`
      <div id="menu-item" aria-label="menuitem" role="menuitem">
        ${this.hasChildren
          ? html`<button id="caret-button" @click=${this.onCaretClicked}>
              <uui-symbol-expand ?open=${this.showChildren}></uui-symbol-expand>
            </button>`
          : ''}
        ${this.href ? this._renderLabelAsAnchor() : this._renderLabelAsButton()}

        <div id="label-button-background"></div>
        ${this.selectOnly === false
          ? html`<slot id="actions-container" name="actions"></slot>`
          : ''}
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

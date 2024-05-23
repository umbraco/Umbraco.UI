import {
  ActiveMixin,
  LabelMixin,
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { UUIMenuItemEvent } from './UUIMenuItemEvent';

/**
 *  @element uui-menu-item
 *  @cssprop --uui-menu-item-indent - set indentation of the menu items
 *  @cssprop --uui-menu-item-flat-structure - set to 1 to remove the indentation of the chevron. Use this when you have a flat menu structure
 *  @cssprop --uui-menu-item-background-color-hover - background color when hovering
 *  @cssprop --uui-menu-item-color-hover - text color when hovering
 *  @cssprop --uui-menu-item-background-color-active - background color when active
 *  @cssprop --uui-menu-item-color-active - text color when active
 *  @cssprop --uui-menu-item-background-color-disabled - background color when disabled
 *  @cssprop --uui-menu-item-color-disabled - text color when disabled
 *   @cssprop --uui-menu-item-background-color-selected - background color when selected
 *  @cssprop --uui-menu-item-color-selected - text color when selected
 *  @cssprop --uui-menu-item-color-background-selected-hover - text color when selected
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
  SelectableMixin(ActiveMixin(LabelMixin('label', LitElement))),
) {
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

  /**
   * Sets the selection mode.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String, attribute: 'select-mode', reflect: true })
  public selectMode?: 'highlight' | 'persisting';

  @state()
  private iconSlotHasContent = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'menu');

    demandCustomElement(this, 'uui-symbol-expand');
    demandCustomElement(this, 'uui-loader-bar');
  }

  async focus() {
    await this.updateComplete;
    this.shadowRoot
      ?.querySelector<
        HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
      >('#label-button')
      ?.focus?.();
  }

  private _labelButtonChanged = (label?: Element | undefined) => {
    this.selectableTarget = label || this;
  };

  private _iconSlotChanged = (e: any): void => {
    this.iconSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  private _onCaretClicked = () => {
    const eventName = this.showChildren
      ? UUIMenuItemEvent.HIDE_CHILDREN
      : UUIMenuItemEvent.SHOW_CHILDREN;
    const event = new UUIMenuItemEvent(eventName, { cancelable: true });
    this.dispatchEvent(event);

    if (event.defaultPrevented) return;

    this.showChildren = !this.showChildren;
  };

  private _onLabelClicked = () => {
    const event = new UUIMenuItemEvent(UUIMenuItemEvent.CLICK_LABEL);
    this.dispatchEvent(event);
  };

  private _renderLabelInside() {
    return html` <slot
        name="icon"
        id="icon"
        style=${this.iconSlotHasContent ? '' : 'display: none;'}
        @slotchange=${this._iconSlotChanged}></slot>
      ${this.renderLabel()}
      <slot name="badge" id="badge"> </slot>`;
  }

  private _renderLabelAsAnchor() {
    if (this.disabled) {
      return html` <span id="label-button" ${ref(this._labelButtonChanged)}>
        ${this._renderLabelInside()}
      </span>`;
    }
    return html` <a
      id="label-button"
      ${ref(this._labelButtonChanged)}
      href=${ifDefined(this.href)}
      target=${ifDefined(this.target || undefined)}
      rel=${ifDefined(
        this.target === '_blank' ? 'noopener noreferrer' : undefined,
      )}
      @click=${this._onLabelClicked}
      ?disabled=${this.disabled}
      aria-label="${this.label}">
      ${this._renderLabelInside()}
    </a>`;
  }

  private _renderLabelAsButton() {
    return html` <button
      id="label-button"
      ${ref(this._labelButtonChanged)}
      @click=${this._onLabelClicked}
      ?disabled=${this.disabled}
      aria-label="${this.label}">
      ${this._renderLabelInside()}
    </button>`;
  }

  render() {
    return html`
      <div id="menu-item" aria-label="menuitem" role="menuitem">
        ${this.hasChildren
          ? html`<button id="caret-button" @click=${this._onCaretClicked}>
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

  static styles = [
    css`
      :host {
        box-sizing: border-box;
        display: block;
        --uui-menu-item-child-indent: calc(var(--uui-menu-item-indent, 0) + 1);
        user-select: none;
        --flat-structure-reversed: calc(
          1 - var(--uui-menu-item-flat-structure, 0)
        );
      }

      #menu-item {
        position: relative;
        padding-left: calc(var(--uui-menu-item-indent, 0) * var(--uui-size-4));
        display: grid;
        grid-template-columns:
          calc(var(--flat-structure-reversed) * var(--uui-size-8))
          1fr;
        grid-template-rows: 1fr;
        white-space: nowrap;
      }

      /** Not active, not selected, not disabled: */
      :host(:not([active], [selected], [disabled], [select-mode='highlight']))
        #menu-item
        #label-button:hover
        ~ #label-button-background,
      :host(:not([active], [selected], [disabled]))
        #menu-item
        #caret-button:hover {
        background-color: var(
          --uui-menu-item-background-color-hover,
          var(--uui-color-surface-emphasis)
        );
      }
      :host(:not([active], [selected], [disabled]))
        #menu-item
        #label-button:hover,
      :host(:not([active], [selected])) #menu-item #caret-button:hover {
        color: var(
          --uui-menu-item-color-hover,
          var(--uui-color-interactive-emphasis)
        );
      }

      /** Active */
      :host([active]) #label-button,
      :host([active]) #caret-button {
        color: var(
          --uui-menu-item-color-active,
          var(--uui-color-current-contrast)
        );
      }
      :host([active]) #label-button-background {
        background-color: var(
          --uui-menu-item-background-color-active,
          var(--uui-color-current)
        );
      }
      :host([active]) #label-button:hover ~ #label-button-background,
      :host([active]) #caret-button:hover {
        background-color: var(
          --uui-menu-item-background-color-active-hover,
          var(--uui-color-current-emphasis)
        );
      }

      /** Disabled */
      :host([disabled]) #menu-item {
        color: var(
          --uui-menu-item-color-disabled,
          var(--uui-color-disabled-contrast)
        );
        background-color: var(
          --uui-menu-item-background-color-disabled,
          var(--uui-color-disabled)
        );
      }

      /** Selected */
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #label-button,
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #caret-button {
        color: var(
          --uui-menu-item-color-selected,
          var(--uui-color-selected-contrast)
        );
      }
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #label-button-background {
        background-color: var(
          --uui-menu-item-background-color-selected,
          var(--uui-color-selected)
        );
      }
      /** Selected, not highlight mode */
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #label-button:hover
        ~ #label-button-background,
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #caret-button:hover {
        background-color: var(
          --uui-menu-item-background-color-selected-hover,
          var(--uui-color-selected-emphasis)
        );
      }

      /** highlight mode, default */
      :host([select-mode='highlight']:not([disabled], [active], [selectable]))
        #menu-item
        #label-button:hover
        ~ #label-button-background {
        border-radius: var(--uui-border-radius);
        background-color: var(
          --uui-menu-item-background-color-highlight,
          var(--uui-color-surface-emphasis)
        );
      }

      /** highlight mode, active */
      :host([select-mode='highlight'][active]:not([disabled]))
        #menu-item
        #label-button-background {
        border-radius: var(--uui-border-radius);
      }

      /** highlight mode, active & selected */
      :host([select-mode='highlight'][active][selected]:not([disabled]))
        #menu-item
        #label-button:hover
        ~ #label-button-background {
        border-radius: var(--uui-border-radius);
        background-color: var(
          --uui-menu-item-background-color-highlight-active-selected,
          var(--uui-color-current-emphasis)
        );
      }

      /** highlight mode, selected */
      :host([select-mode='highlight'][selected]:not([disabled]))
        #menu-item
        #label-button,
      :host([select-mode='highlight'][selected]:not([disabled]))
        #menu-item
        #caret-button {
        color: var(
          --uui-menu-item-color-highlight-selected,
          var(--uui-color-interactive)
        );
      }
      :host([select-mode='highlight'][selectable][selected]:not([disabled]))
        #menu-item
        #label-button:hover {
        color: var(
          --uui-menu-item-background-color-highlight-selectable-selected,
          var(--uui-color-interactive-emphasis)
        );
      }

      /** highlight mode, selected, selectable caret hover */
      :host([selected][selectable][select-mode='highlight']:not([active]))
        #menu-item
        #caret-button:hover {
        border-radius: var(--uui-border-radius);
        background-color: var(
          --uui-menu-item-background-color-highlight-selectable-selected,
          var(--uui-color-surface-emphasis)
        );
        color: var(
          --uui-menu-item-color-highlight-selectable-selected,
          var(--uui-color-interactive-emphasis)
        );
      }

      /** Highlight borders */

      :host([select-mode='highlight']:not([disabled]))
        #menu-item
        #label-button-background::after {
        border-radius: var(--uui-border-radius);
        position: absolute;
        content: '';
        inset: 1px;
        border: 2px solid
          var(--uui-menu-item-border-color-highlight, var(--uui-color-selected));
        opacity: 0;
      }

      :host([select-mode='highlight'][selectable][selected]:not([disabled]))
        #menu-item
        #caret-button:hover::after {
        border-top-left-radius: var(--uui-border-radius);
        border-bottom-left-radius: var(--uui-border-radius);
        position: absolute;
        content: '';
        inset: 1px 0 1px 1px;
        border: 2px solid
          var(--uui-menu-item-border-color-highlight, var(--uui-color-selected));
        border-right: none;
      }

      :host([select-mode='highlight'][selected]:not([disabled]))
        #menu-item
        #label-button-background::after {
        opacity: 1;
      }

      :host([select-mode='highlight'][selectable]:not([disabled]))
        #menu-item
        #label-button:hover
        ~ #label-button-background::after {
        opacity: 0.33;
      }
      :host([select-mode='highlight'][selected]:not([disabled]))
        #menu-item
        #label-button:hover
        ~ #label-button-background::after {
        opacity: 0.66;
      }

      /** Buttons */

      :host([disabled]) #label-button {
        cursor: default;
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

      #label-button {
        position: relative;
        flex-grow: 1;
        grid-column-start: 2;
        white-space: nowrap;
        overflow: hidden;
        padding-right: var(--uui-size-space-3);
        padding-left: calc(
          var(--uui-menu-item-flat-structure) * var(--uui-size-space-3)
        );
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: currentColor;
        min-height: var(--uui-size-12);
        z-index: 1;
        font-weight: inherit;
      }

      #label-button .label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span#label-button {
        pointer-events: none; /* avoid hovering state on this. */
      }

      #caret-button {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--uui-color-interactive);
      }

      #label-button-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: var(--uui-menu-item-border-radius, 0px);
      }

      #actions-container {
        opacity: 0;
        width: 0;
        grid-column-start: 3;
      }
      :host(:not([disabled])) #menu-item:hover #actions-container,
      :host(:not([disabled])) #menu-item:focus #actions-container,
      :host(:not([disabled])) #menu-item:focus-within #actions-container {
        opacity: 1;
        width: auto;
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

      /** Focus styling */

      :host([select-mode='highlight']) #label-button:focus-visible {
        outline: none;
        overflow: initial;
      }

      :host([select-mode='highlight']) #label-button:focus-visible::after {
        content: '';
        border-radius: calc(var(--uui-border-radius) - 1px);
        position: absolute;
        inset: 3px 3px 3px -5px;
        border: 2px solid var(--uui-color-focus);
      }

      :host([select-mode='highlight']) #caret-button:focus-visible {
        outline: none;
        overflow: initial;
      }

      :host([select-mode='highlight']) #caret-button:focus-visible::after {
        content: '';
        position: absolute;
        inset: 3px;
        border-radius: calc(var(--uui-border-radius) - 1px);
        border: 2px solid var(--uui-color-focus);
      }

      /** Slots */

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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-menu-item': UUIMenuItemElement;
  }
}

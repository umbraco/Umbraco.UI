import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import {
  ActiveMixin,
  LabelMixin,
  SelectableMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { UUIMenuItemEvent } from './UUIMenuItemEvent';

/**
 *  @element uui-list-item
 *
 */

//TODO add the deselect method

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
        padding-left: calc(
          var(--uui-menu-item-indent, 0) * var(--uui-size-layout-0, 24px)
        );
      }

      button {
        display: block;
        padding: 0;
        text-align: left;
        box-shadow: none;
        border: none;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        z-index: 1;
        padding: 0 var(--uui-size-base-unit) 0 var(--uui-size-base-unit);
        min-height: calc(var(--uui-size-base-unit) * 6);
      }
      button:hover {
        color: var(--uui-interface-contrast-hover);
      }

      #label-button {
        flex-grow: 1;
      }
      #caret-button + #label-button {
        padding-left: 0;
      }
      #label-button-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-surface-hover);
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
      :host([selected]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-select-hover);
      }
      :host([selected][disabled]) #label-button {
        color: var(--uui-interface-select-contrast-disabled);
        background-color: var(--uui-interface-select-disabled);
      }
      /*
      slot:not([name]):focus-within {
        TODO: implement proper focus outline
      }
      */

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
      #actions-container {
        opacity: 0;
        transition: opacity 120ms;
      }
      #menu-item:hover #actions-container {
        opacity: 1;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-children' })
  public showChildren = false;

  @property({ type: Boolean, attribute: 'has-children' })
  public hasChildren = false;

  /** TODO: implement loading property */

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

  render() {
    return html`
      <div id="menu-item">
        ${this.hasChildren
          ? html`<button id="caret-button" @click=${this.onCaretClicked}>
              <uui-caret ?open=${this.showChildren}></uui-caret>
            </button>`
          : ''}
        <button
          id="label-button"
          @click=${this.onLabelClicked}
          ?disabled=${this.disabled}
          aria-label="${this.label}">
          ${this.renderLabel()}
        </button>
        <div id="label-button-background"></div>
        <slot id="actions-container" name="actions"></slot>
      </div>
      ${this.showChildren ? html`<slot></slot>` : ''}
    `;
  }
}

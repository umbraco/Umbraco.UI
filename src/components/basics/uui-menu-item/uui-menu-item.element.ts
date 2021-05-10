import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators';
import { LabelComponent } from '../../../mixins/LabelComponent';
import { UUIMenuItemEvent } from './UUIMenuItemEvent';

/**
 *  @element uui-list-item
 *
 */

//TODO add the deselect method
//TODO implement propper style when it is ready

export class UUIMenuItemElement extends LabelComponent('label', LitElement) {
  static styles = [
    css`
      :host {
        display: block;
        background-color: var(--uui-interface-surface);
        /** consider transparent. */
      }

      #menu-item {
        position: relative;
        display: flex;
        align-items: stretch;
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

      :host([disabled]) button {
        color: var(--uui-interface-contrast-disabled);
      }
      :host([disabled]) button:hover {
        color: var(--uui-interface-contrast-disabled);
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
      :host([active][disabled]) button {
        color: var(--uui-interface-active-contrast-disabled);
        background-color: var(--uui-interface-active-disabled);
      }

      :host([selected]) button {
        color: var(--uui-interface-select-contrast);
      }
      :host([selected]) button:hover {
        color: var(--uui-interface-active-select-hover);
      }
      :host([selected]) #label-button-background {
        background-color: var(--uui-interface-select);
      }
      :host([selected]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-select-hover);
      }
      :host([selected][disabled]) {
        color: var(--uui-interface-active-select-disabled);
        background-color: var(--uui-interface-select-disabled);
      }
      /*
      slot:not([name]):focus-within {
        TODO: implement proper focus outline
      }
      */

      slot[name='children'] {
        position: relative;
        display: block;
        width: 100%;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property({ type: Boolean, reflect: true })
  public active = false;

  @property({ type: Boolean, reflect: true })
  public selected = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-children' })
  public showChildren = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-children' })
  public hasChildren = false;

  /** TODO: implement loading property */

  constructor() {
    super();
    this.addEventListener('click', this.onHostClick);
  }

  private onHostClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
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
          aria-label="${this.label}"
        >
          ${this.renderLabel()}
        </button>
        <div id="label-button-background"></div>
        <slot name="actions"></slot>
      </div>
      ${this.showChildren ? html`<slot name="children"></slot>` : ''}
    `;
  }
}

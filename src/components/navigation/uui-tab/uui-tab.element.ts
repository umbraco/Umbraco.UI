import { LitElement, html, css, PropertyValues } from 'lit';
import { property } from 'lit/decorators';
import { UUITabEvent } from './UUITabEvent';

let TabKeyCounter = 0;

/**
 *  @element uui-editor-tab
 */
export class UUITabElement extends LitElement {
  static styles = [
    css`
      button {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 4px 20px 0 20px;
        border: none;
        box-sizing: border-box;
        height: 75px;
        min-width: 75px;
        background-color: var(--uui-interface-surface);
        color: var(--uui-interface-contrast);
        cursor: pointer;

        transition: background-color 80ms;
      }

      button:hover {
        background-color: var(--uui-interface-surface-hover);
        color: var(--uui-interface-contrast-hover);
      }

      button:active {
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15),
          0 1px 2px rgba(0, 0, 0, 0.05);
      }

      button::before {
        content: '';
        position: absolute;
        height: 0px;
        max-width: 50px;
        width: calc(100% - 16px);
        left: auto;
        right: auto;
        background-color: var(--uui-interface-active);
        bottom: 0;
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transition: all 0.2s linear;
      }
      button:hover::before {
        background-color: var(--uui-interface-active-hover);
      }

      :host([active]) button {
        color: var(--uui-interface-contrast-active);
        cursor: default;
      }
      :host([active]) button::before {
        opacity: 1;
        height: 4px;
      }
    `,
  ];

  @property({ type: Boolean, attribute: 'active', reflect: true })
  public active = false;

  @property({ type: String })
  public key: string | null = null;

  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    this.setAttribute('role', 'tab');
    this.key = this.key || `uui-tab-${TabKeyCounter++}`;
  }

  activate() {
    this.setActive(true);
  }

  deactivate() {
    this.setActive(false);
  }

  toggle() {
    if (this.active === true) {
      this.deactivate();
      return;
    }
    this.activate();
  }

  async setActive(state: boolean) {
    this.active = state;

    const eventName: string = state ? 'activate' : 'deactivate';
    const event = new UUITabEvent(eventName);
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <button type="button" @click=${this.activate}>
        <slot></slot>
      </button>
    `;
  }
}

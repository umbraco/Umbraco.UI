import { LitElement, html, css, property, PropertyValues } from 'lit-element';
import { UUITabEvent } from '../../event/UUITabEvent';

let TabIdCounter = 0;

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
        border-right: 1px solid lightgray;
        box-sizing: border-box;
        height: 75px;
        min-width: 75px;
        color: darkblue;
        background-color: transparent;
        cursor: pointer;
      }

      button:hover {
        color: blue;
      }

      button:active {
        cursor: default;
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
        background-color: pink;
        bottom: 0;
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transition: all 0.2s linear;
      }

      :host([active]) button {
        color: blue;
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

  /*
  constructor() {
    super();
  }
  */

  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    this.setAttribute('role', 'tab');
    console.log('init tab: ', this.key);
    this.key = this.key || `uui-tab-${TabIdCounter++}`;
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

  setActive(state: boolean) {
    console.log('setActive', state);

    const eventName: string = state
      ? 'navigation-item-activate'
      : 'navigation-item-deactivate';
    const event = new UUITabEvent(eventName, {
      cancelable: true,
      detail: { key: this.key },
    });
    this.dispatchEvent(event);

    if (event.defaultPrevented !== true) {
      this.active = state;
    }
  }

  private onClick(event: Event) {
    this.activate();
  }

  render() {
    return html`
      <button type="button" @click=${(e: Event) => this.onClick(e)}>
        <slot></slot>
      </button>
    `;
  }
}

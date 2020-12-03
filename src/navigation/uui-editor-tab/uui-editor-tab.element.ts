import { LitElement, html, css, property, PropertyValues } from 'lit-element';
import { UUITabEvent } from '../../event/UUITabEvent';

let TabIdCounter = 0;

/**
 *  @element uui-editor-tab
 */
export class UUIEditorTabElement extends LitElement {
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

      button.--active {
        color: blue;
        cursor: default;
      }
      button.--active::before {
        opacity: 1;
        height: 4px;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  public active = false;

  /*
  constructor() {
    super();
  }
  */

  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    this.setAttribute('role', 'tab');
    this.id = this.id || `uui-tab-${TabIdCounter++}`;
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
      detail: { tabId: this.id },
    });
    this.dispatchEvent(event);

    if (event.defaultPrevented !== true) {
      this.active = state;
    }
  }

  private onClick(event: Event) {
    this.toggle();
  }

  //class=${classMap({ '--active': this._active })}
  render() {
    return html`
      <button
        type="button"
        class="${this.active ? '--active' : ''}"
        @click=${(e: Event) => this.onClick(e)}
      >
        <slot> </slot>
      </button>
    `;
  }
}

import { demandCustomElement } from '../../internal/utils';
import { css, html } from 'lit';
import { UUIInputElement } from '../input/input.js';
import { iconLock, iconUnlock } from '../icon-registry-essential/svgs/index.js';
import { property } from 'lit/decorators.js';
import { UUIInputLockEvent } from './UUIInputLockEvent';

/**
 * @element uui-input-lock
 * @extends uui-input
 */
export class UUIInputLockElement extends UUIInputElement {
  /**
   * Determine the inputs locked state.
   * @type {boolean}
   * @attr
   * @default true
   */
  @property({ type: Boolean, reflect: true })
  public set locked(lock: boolean) {
    this.#locked = lock;
    this.readonly = lock;
    this.tabIndex = lock ? -1 : 0;
  }
  public get locked(): boolean {
    return this.#locked;
  }
  #locked: boolean = true;

  /**
   * Define the label for the unlock button.
   * @type {string}
   * @attr
   * @default true
   */
  @property({ type: String, reflect: false, attribute: 'unlock-label' })
  public unlockLabel: string = 'Unlock input';

  /**
   * Define the label for the lock button.
   * @type {string}
   * @attr
   * @default true
   */
  @property({ type: String, reflect: false, attribute: 'lock-label' })
  public lockLabel: string = 'Lock input';

  constructor() {
    super();
    this.readonly = true;
    this.tabIndex = -1;
  }

  connectedCallback(): void {
    super.connectedCallback();

    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-button');
  }

  _onLockToggle() {
    this.locked = !this.locked;
    this.pristine = false;
    this.dispatchEvent(new UUIInputLockEvent(UUIInputLockEvent.LOCK_CHANGE));
    if (!this.locked) {
      this._input?.focus();
    }
  }

  renderIcon() {
    return this.locked === true
      ? html`<uui-icon name="lock" .fallback=${iconLock.strings[0]}></uui-icon>`
      : html`<uui-icon
          name="unlock"
          .fallback=${iconUnlock.strings[0]}></uui-icon>`;
  }

  renderPrepend() {
    return html`<uui-button
      .disabled=${this.disabled}
      @click=${this._onLockToggle}
      compact
      id="lock"
      label="${this.locked ? this.unlockLabel : this.lockLabel}">
      ${this.renderIcon()}
    </uui-button>`;
  }

  static styles = [
    ...UUIInputElement.styles,
    css`
      #lock {
        height: 100%;

        --uui-input-padding: 1px var(--uui-size-space-1);
        --uui-button-padding-left-factor: 0.75;
        --uui-button-padding-right-factor: 0.75;
        font-size: 12px;
      }

      :host([locked]) #input {
        cursor: not-allowed;
        opacity: 0.55;
      }
    `,
  ];
}

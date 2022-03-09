import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

type HTMLElementWithDisable = HTMLElement & { disabled: boolean };

export class UUILockSlotElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      :host([locked]) slot {
        opacity: 0.5;
      }

      button {
        /* reset: */
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        background-color: transparent;

        cursor: pointer;
        color: var(--uui-button-contrast, var(--uui-interface-contrast));

        transition: color 80ms;
      }
      button:hover {
        color: var(
          --uui-button-contrast-hover,
          var(--uui-interface-contrast-hover)
        );
      }

      button[disabled] {
        color: var(
          --uui-button-contrast-disabled,
          var(--uui-interface-contrast-disabled)
        );
        cursor: default;
      }
    `,
  ];

  private _locked = true;
  @property({ type: Boolean, reflect: true })
  get locked() {
    return this._locked;
  }

  set locked(newVal: boolean) {
    const oldValue = this._locked;
    this._locked = newVal;
    this.requestUpdate('locked', oldValue);
    this.updateSlotElements();

    /* TODO: Fix so we provide focus to the first available element in the slot. */
    if (this._locked === false && this.slotElements.length > 0) {
      this.slotElements[0].focus();
    }
  }

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private slotElements: HTMLElementWithDisable[] = [];

  private onSlotChanged(e: any) {
    this.slotElements = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((e: any) => e.disabled !== undefined) as HTMLElementWithDisable[];

    this.updateSlotElements();
  }

  private updateSlotElements() {
    this.slotElements.forEach(
      (el: HTMLElementWithDisable) => (el.disabled = this._locked)
    );
  }

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        @click=${() => {
          this.locked = !this.locked;
        }}>
        <uui-lock-symbol ?open=${this.locked === false}></uui-lock-symbol>
      </button>
      <slot @slotchange=${this.onSlotChanged}></slot>
    `;
  }
}

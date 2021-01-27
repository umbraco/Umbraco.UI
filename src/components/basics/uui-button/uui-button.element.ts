import { LitElement, html, css, property } from 'lit-element';
import { UUIButtonClickEvent } from '../../../event/UUIButtonClickEvent';
import {
  SymbolicColor,
  SymbolicColorDefaultValue,
} from '../../../type/SymbolicColor';

/**
 *  @element uui-button
 *  @fires {UUIButtonClickEvent} click - fires when the element is clicked
 *  @slot - for button contents
 */
export class UUIButtonElement extends LitElement {
  static styles = [
    css`
      button {
        display: inline-block;
        /* example of using the base-unit prop for sizing, it can be usefull to hardcode a minor adjustment for the right look, notice + 2px in this exmample: */
        padding: var(--uui-size-base-unit)
          calc((var(--uui-size-base-unit) * 2) + 2px);
        text-align: center;
        vertical-align: middle;
        border: none;
        box-shadow: none;
        border-radius: var(--uui-size-border-radius);
        cursor: pointer;
        font-weight: 800;

        /* Default button-style: */
        background: var(--uui-interface-standard-background-color);
        color: var(--uui-interface-standard-text-color);
      }

      button[disabled] {
        /* Idea on how to make disabled state fit with given style/colors */
        filter: grayscale(0.2) contrast(0.3) brightness(1.4);
        cursor: default;
      }

      :host([button-style='positive']) button {
        background: var(--uui-interface-positive-background-color);
        color: var(--uui-interface-positive-text-color);
      }

      :host([loading]) button:before {
        content: '⏳';
      }
    `,
  ];

  // TODO: This need to be tested and implemented correctly. We need it not to be focusable, clickable and the styling should be fitted as well.
  @property({ type: Boolean, attribute: true })
  disabled = false;

  // TODO: I'm not sure we will need a loading state, but lets concider having a waiting state, as waiting for a request to complete like Save.
  @property({ type: Boolean, attribute: true })
  loading = false;

  @property({ type: String, attribute: 'button-style' })
  buttonStyle: SymbolicColor = SymbolicColorDefaultValue;

  private onClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(new UUIButtonClickEvent());
  }
  render() {
    return html`
      <button @click=${this.onClick} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}

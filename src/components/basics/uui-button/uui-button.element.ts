import { LitElement, html, css, property } from 'lit-element';
import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '../../../animations/uui-shake';
import { UUIButtonClickEvent } from './UUIButtonClickEvent';
import {
  SymbolicColorType,
  SymbolicColorDefaultValue,
  SymbolicColorCSSCreator,
} from '../../../type/SymbolicColor';

/**
 *  @element uui-button
 *  @fires {UUIButtonClickEvent} click - fires when the element is clicked
 *  @slot - for button contents
 *  @description - All-round button
 */
export class UUIButtonElement extends LitElement {
  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      button {
        display: inline-block;
        /* example of using the base-unit prop for sizing, it can be useful to hardcode a minor adjustment for the right look, notice + 2px in this example: */
        padding: var(--uui-size-base-unit)
          calc((var(--uui-size-base-unit) * 2) + 2px);
        text-align: center;
        vertical-align: middle;
        border: none;
        box-shadow: none;
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-size-border-radius)
        );
        cursor: pointer;
        font-weight: var(
          --uui-button-font-weight,
          var(--uui-interface-font-weight)
        );
        font-size: inherit;
        font-family: inherit;

        background-color: var(
          --uui-button-background,
          var(--uui-interface-background)
        );
        color: var(--uui-button-contrast, var(--uui-interface-contrast));

        transition: background-color 80ms;
      }
      button:hover {
        background-color: var(
          --uui-button-background-hover,
          var(--uui-interface-background-hover)
        );
        color: var(
          --uui-button-contrast-hover,
          var(--uui-interface-contrast-hover)
        );
      }

      button[disabled] {
        background-color: var(
          --uui-button-background-disabled,
          var(--uui-interface-background-disabled)
        );
        color: var(
          --uui-button-contrast-disabled,
          var(--uui-interface-contrast-disabled)
        );
        cursor: default;
      }
      button[disabled]:active {
        animation: ${UUIHorizontalShakeAnimationValue};
      }

      :host([loading]) button:before {
        content: '⏳';
      }
    `,
    SymbolicColorCSSCreator(
      symbolicColorName =>
        css`
          :host([look='${symbolicColorName}']) button {
            background-color: var(--uui-color-${symbolicColorName}-background);
            color: var(--uui-color-${symbolicColorName}-contrast);
            border-color: var(--uui-color-${symbolicColorName}-border);
            font-weight: var(--uui-color-${symbolicColorName}-font-weight);
          }
          :host([look='${symbolicColorName}']) button:hover {
            background-color: var(
              --uui-color-${symbolicColorName}-background-hover
            );
            color: var(--uui-color-${symbolicColorName}-contrast-hover);
            border-color: var(--uui-color-${symbolicColorName}-border-hover);
          }
          :host([look='${symbolicColorName}']) button[disabled] {
            background-color: var(
              --uui-color-${symbolicColorName}-background-disabled
            );
            color: var(--uui-color-${symbolicColorName}-contrast-disabled);
            border-color: var(--uui-color-${symbolicColorName}-border-disabled);
          }
        `
    ),
  ];

  // TODO: This need to be tested and implemented correctly. We need it not to be focusable, clickable and the styling should be fitted as well.
  @property({ type: Boolean, attribute: true })
  disabled = false;

  @property({ type: Boolean, attribute: true })
  loading = false;

  // Note: We should bake in the failed or good state from current backoffice, its not the most optimal UX and no stick to it ongoing.

  @property({ attribute: 'look' })
  look: SymbolicColorType = SymbolicColorDefaultValue;

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

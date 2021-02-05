import { LitElement, html, css, property } from 'lit-element';
import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '../../../animations/uui-shake';
import { UUIButtonClickEvent } from './UUIButtonClickEvent';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
  InterfaceLookCSSCreator,
} from '../../../type/InterfaceLook';

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
        position: relative;
        display: inline-block;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        border: none;
        box-shadow: none;
        border: 1px solid
          var(--uui-button-background, var(--uui-interface-background));
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

      button > slot {
        display: block;
        /* example of using the base-unit prop for sizing, it can be useful to hardcode a minor adjustment for the right look, notice + 2px in this example: */
        padding: var(--uui-size-base-unit)
          calc((var(--uui-size-base-unit) * 2) + 2px);
      }

      ::slotted(*) {
        margin-left: 10px;
        margin-right: 10px;
      }

      :host([loading]) > button > slot {
        opacity: 0;
      }
      :host([loading]) button:before {
        content: '⏳';
        position: absolute;
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
    `,
    InterfaceLookCSSCreator(
      lookName =>
        css`
          :host([look='${lookName}']) button {
            background-color: var(--uui-look-${lookName}-background);
            color: var(--uui-look-${lookName}-contrast);
            border-color: var(--uui-look-${lookName}-border);
            font-weight: var(--uui-look-${lookName}-font-weight);
          }
          :host([look='${lookName}']) button:hover {
            background-color: var(--uui-look-${lookName}-background-hover);
            color: var(--uui-look-${lookName}-contrast-hover);
            border-color: var(--uui-look-${lookName}-border-hover);
          }
          :host([look='${lookName}']) button[disabled] {
            background-color: var(--uui-look-${lookName}-background-disabled);
            color: var(--uui-look-${lookName}-contrast-disabled);
            border-color: var(--uui-look-${lookName}-border-disabled);
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
  look?: InterfaceLookType = InterfaceLookDefaultValue;

  private onClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(new UUIButtonClickEvent());
  }
  render() {
    return html`
      <button @click=${this.onClick} ?disabled=${this.disabled}>
        <slot part="inner"></slot>
      </button>
    `;
  }
}

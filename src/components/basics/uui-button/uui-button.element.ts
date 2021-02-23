import { LitElement, html, css, property } from 'lit-element';
import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '../../../animations/uui-shake';
import { UUIButtonEvent } from './UUIButtonEvent';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
  InterfaceLookCSSCreator,
} from '../../../type/InterfaceLook';

/**
 *  @element uui-button
 *  @fires {UUIButtonEvent} click - fires when the element is clicked
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
        height: calc(
          var(--uui-button-base-unit, var(--uui-size-base-unit)) * 6
        );
        padding: 0;
        text-align: center;
        vertical-align: middle;
        box-shadow: none;
        border: var(--uui-button-border-width, 1px) solid
          var(--uui-button-border-color, var(--uui-interface-surface));
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
          --uui-button-background-color,
          var(--uui-interface-surface)
        );
        color: var(--uui-button-contrast, var(--uui-interface-contrast));

        transition: background-color 80ms, border-color 80ms, color 80ms;
      }
      button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-interface-surface-hover)
        );
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-interface-surface-hover)
        );
        color: var(
          --uui-button-contrast-hover,
          var(--uui-interface-contrast-hover)
        );
      }

      button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-interface-surface-disabled)
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
        padding: 0
          calc((var(--uui-button-base-unit, var(--uui-size-base-unit)) * 3));
      }

      ::slotted(*) {
        margin-left: calc(
          var(--uui-button-base-unit, var(--uui-size-base-unit)) * 3
        );
        margin-right: calc(
          var(--uui-button-base-unit, var(--uui-size-base-unit)) * 3
        );
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
            background-color: var(--uui-look-${lookName}-surface);
            color: var(--uui-look-${lookName}-contrast);
            border-color: var(--uui-look-${lookName}-border);
            font-weight: var(--uui-look-${lookName}-font-weight);
          }
          :host([look='${lookName}']) button:hover {
            background-color: var(--uui-look-${lookName}-surface-hover);
            color: var(--uui-look-${lookName}-contrast-hover);
            border-color: var(--uui-look-${lookName}-border-hover);
          }
          :host([look='${lookName}']) button[disabled] {
            background-color: var(--uui-look-${lookName}-surface-disabled);
            color: var(--uui-look-${lookName}-contrast-disabled);
            border-color: var(--uui-look-${lookName}-border-disabled);
          }
        `
    ),
  ];

  // TODO: This need to be tested and implemented correctly. We need it not to be focusable, clickable and the styling should be fitted as well.
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String, attribute: 'aria-label' })
  ariaLabel?: string;

  @property({ reflect: true })
  look: InterfaceLookType = InterfaceLookDefaultValue;

  private onClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(new UUIButtonEvent(UUIButtonEvent.CLICK));
  }
  render() {
    return html`
      <button
        @click=${this.onClick}
        ?disabled=${this.disabled}
        aria-label="${this.ariaLabel || ''}"
      >
        <slot></slot>
      </button>
    `;
  }
}

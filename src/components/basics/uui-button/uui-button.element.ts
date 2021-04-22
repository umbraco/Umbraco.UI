import { LitElement, html, css, property } from 'lit-element';
import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '../../../animations/uui-shake';
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

//TODO add compact attribute
export class UUIButtonElement extends LitElement {
  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        position: relative;
        display: inline-block;
        margin-left: calc(var(--uui-button-merge-border-left, 0) * -1px);
        --uui-button-slot-padding-x-factor: 3;
        --uui-button-slot-padding-l-factor: 3;
        --uui-button-slot-padding-r-factor: 3;
      }

      :host([compact]) {
        --uui-button-slot-padding-x-factor: 0.666;
      }

      button {
        height: 100%;
        min-height: calc(
          var(--uui-button-base-unit, var(--uui-size-base-unit)) * 6
        );
        width: 100%;
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
          calc(
            (
              var(--uui-button-base-unit, var(--uui-size-base-unit)) *
                var(--uui-button-slot-padding-r-factor)
            )
          )
          0
          calc(
            (
              var(--uui-button-base-unit, var(--uui-size-base-unit)) *
                var(--uui-button-slot-padding-l-factor)
            )
          );
      }

      ::slotted(*) {
        margin-left: calc(
          var(--uui-button-base-unit, var(--uui-size-base-unit)) *
            var(--uui-button-slot-padding-x-factor)
        );
        margin-right: calc(
          var(--uui-button-base-unit, var(--uui-size-base-unit)) *
            var(--uui-button-slot-padding-x-factor)
        );
      }
    `,
    InterfaceLookCSSCreator(
      lookName =>
        css`
          :host([look='${lookName}']) button {
            background-color: var(--uui-look-${lookName}-surface);
            color: var(--uui-look-${lookName}-contrast);
            border-style: var(
              --uui-button-border-style,
              var(--uui-look-${lookName}-border-style, solid)
            );
            border-radius: var(
              --uui-button-border-radius,
              var(
                --uui-look-${lookName}-border-radius,
                var(--uui-size-border-radius)
              )
            );
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

  @property({ type: String, attribute: 'aria-label' })
  ariaLabel?: string;

  @property({ reflect: true })
  look: InterfaceLookType = InterfaceLookDefaultValue;

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
  render() {
    return html`
      <button ?disabled=${this.disabled} aria-label="${this.ariaLabel || ''}">
        <slot></slot>
      </button>
    `;
  }
}

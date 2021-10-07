import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '@umbraco-ui/uui-base/lib/animations';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
} from '@umbraco-ui/uui-base/lib/types';

/**
 *  @element uui-button
 *  @fires {UUIButtonEvent} click - fires when the element is clicked
 *  @slot - for button contents
 *  @description - All-round button
 */
export class UUIButtonElement extends LabelMixin('', LitElement) {
  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        position: relative;
        display: inline-block;
        margin-left: calc(var(--uui-button-merge-border-left, 0) * -1px);
        --uui-button-slot-padding-l-factor: 3;
        --uui-button-slot-padding-r-factor: 3;
        background-color: var(--uui-interface-surface);
      }

      :host([compact]) {
        --uui-button-slot-padding-l-factor: 1;
        --uui-button-slot-padding-r-factor: 1;
      }

      button {
        height: 100%;
        min-height: var(
          --uui-button-height,
          calc(var(--uui-button-base-unit, var(--uui-size-base-unit)) * 6)
        );
        width: 100%;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        box-shadow: none;
        border-width: var(--uui-button-border-width, 1px);
        border-style: solid;
        border-color: var(
          --uui-button-border-color,
          var(--uui-interface-surface)
        );
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

      button > .label {
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

      /* LOOKS */

      :host([look='primary']) button {
        background-color: var(--uui-look-primary-surface);
        color: var(--uui-look-primary-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-primary-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-primary-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-primary-border);
        font-weight: var(--uui-look-primary-font-weight);
      }
      :host([look='primary']) button:hover {
        background-color: var(--uui-look-primary-surface-hover);
        color: var(--uui-look-primary-contrast-hover);
        border-color: var(--uui-look-primary-border-hover);
      }
      :host([look='primary']) button[disabled] {
        background-color: var(--uui-look-primary-surface-disabled);
        color: var(--uui-look-primary-contrast-disabled);
        border-color: var(--uui-look-primary-border-disabled);
      }

      :host([look='secondary']) button {
        background-color: var(--uui-look-secondary-surface);
        color: var(--uui-look-secondary-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-secondary-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-secondary-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-secondary-border);
        font-weight: var(--uui-look-secondary-font-weight);
      }
      :host([look='secondary']) button:hover {
        background-color: var(--uui-look-secondary-surface-hover);
        color: var(--uui-look-secondary-contrast-hover);
        border-color: var(--uui-look-secondary-border-hover);
      }
      :host([look='secondary']) button[disabled] {
        background-color: var(--uui-look-secondary-surface-disabled);
        color: var(--uui-look-secondary-contrast-disabled);
        border-color: var(--uui-look-secondary-border-disabled);
      }

      :host([look='outline']) button {
        background-color: var(--uui-look-outline-surface);
        color: var(--uui-look-outline-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-outline-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-outline-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-outline-border);
        font-weight: var(--uui-look-outline-font-weight);
      }
      :host([look='outline']) button:hover {
        background-color: var(--uui-look-outline-surface-hover);
        color: var(--uui-look-outline-contrast-hover);
        border-color: var(--uui-look-outline-border-hover);
      }
      :host([look='outline']) button[disabled] {
        background-color: var(--uui-look-outline-surface-disabled);
        color: var(--uui-look-outline-contrast-disabled);
        border-color: var(--uui-look-outline-border-disabled);
      }

      :host([look='placeholder']) button {
        background-color: var(--uui-look-placeholder-surface);
        color: var(--uui-look-placeholder-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-placeholder-border-style, dashed)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(
            --uui-look-placeholder-border-radius,
            var(--uui-size-border-radius)
          )
        );
        border-color: var(--uui-look-placeholder-border);
        font-weight: var(--uui-look-placeholder-font-weight);
      }
      :host([look='placeholder']) button:hover {
        background-color: var(--uui-look-placeholder-surface-hover);
        color: var(--uui-look-placeholder-contrast-hover);
        border-color: var(--uui-look-placeholder-border-hover);
      }
      :host([look='placeholder']) button[disabled] {
        background-color: var(--uui-look-placeholder-surface-disabled);
        color: var(--uui-look-placeholder-contrast-disabled);
        border-color: var(--uui-look-placeholder-border-disabled);
      }

      :host([look='positive']) button {
        background-color: var(--uui-look-positive-surface);
        color: var(--uui-look-positive-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-positive-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-positive-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-positive-border);
        font-weight: var(--uui-look-positive-font-weight);
      }
      :host([look='positive']) button:hover {
        background-color: var(--uui-look-positive-surface-hover);
        color: var(--uui-look-positive-contrast-hover);
        border-color: var(--uui-look-positive-border-hover);
      }
      :host([look='positive']) button[disabled] {
        background-color: var(--uui-look-positive-surface-disabled);
        color: var(--uui-look-positive-contrast-disabled);
        border-color: var(--uui-look-positive-border-disabled);
      }

      :host([look='warning']) button {
        background-color: var(--uui-look-warning-surface);
        color: var(--uui-look-warning-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-warning-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-warning-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-warning-border);
        font-weight: var(--uui-look-warning-font-weight);
      }
      :host([look='warning']) button:hover {
        background-color: var(--uui-look-warning-surface-hover);
        color: var(--uui-look-warning-contrast-hover);
        border-color: var(--uui-look-warning-border-hover);
      }
      :host([look='warning']) button[disabled] {
        background-color: var(--uui-look-warning-surface-disabled);
        color: var(--uui-look-warning-contrast-disabled);
        border-color: var(--uui-look-warning-border-disabled);
      }

      :host([look='danger']) button {
        background-color: var(--uui-look-danger-surface);
        color: var(--uui-look-danger-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-danger-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-danger-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-danger-border);
        font-weight: var(--uui-look-danger-font-weight);
      }
      :host([look='danger']) button:hover {
        background-color: var(--uui-look-danger-surface-hover);
        color: var(--uui-look-danger-contrast-hover);
        border-color: var(--uui-look-danger-border-hover);
      }
      :host([look='danger']) button[disabled] {
        background-color: var(--uui-look-danger-surface-disabled);
        color: var(--uui-look-danger-contrast-disabled);
        border-color: var(--uui-look-danger-border-disabled);
      }
    `,
  ];

  // TODO: This need to be tested and implemented correctly. We need it not to be focusable, clickable and the styling should be fitted as well.
  @property({ type: Boolean, reflect: true })
  disabled = false;
  @property({ reflect: true })
  look: InterfaceLookType = InterfaceLookDefaultValue;

  @property({ type: Boolean, reflect: true })
  compact = false;

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
      <button ?disabled=${this.disabled} aria-label="${this.label}">
        ${this.renderLabel()}
      </button>
    `;
  }
}

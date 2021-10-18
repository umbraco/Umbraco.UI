import { html, css } from 'lit';
import {
  UUIHorizontalShakeKeyframes,
  UUIHorizontalShakeAnimationValue,
} from '@umbraco-ui/uui-base/lib/animations';
import { iconWrong, iconCheck } from './toggle-icons';
import { UUIBooleanInputBaseElement } from '@umbraco-ui/uui-base/lib/uui-boolean-input';

/**
 *  Umbraco Toggle-switch, toggles between off/on.
 *  @element uui-toggle
 *  @fires UUIBooleanInputEvent#change- fires when the element is begin checked by a user action
 *  @slot to overwrite displayed label content
 *  @cssprop --uui-toggle-size - Define the toggle size.
 *  @cssprop --uui-toggle-switch-width - Define the slider width.
 *  @cssprop --uui-toggle-background-color - Set the toggle background color
 *  @cssprop --uui-toggle-border-color - Set the toggle border color
 *  @cssprop --uui-toggle-border-color-hover - Set the toggle background color when hovered
 *  @cssprop --uui-toggle-background-color-hover - Set the toggle background color when hovered
 *  @cssprop --uui-toggle-border-color-focus - Set the toggle background color when focused
 *  @cssprop --uui-toggle-background-color-focus - Set the toggle background color when focused
 *  @extends UUIBooleanInputBaseElement
 */
export class UUIToggleElement extends UUIBooleanInputBaseElement {
  static styles = [
    ...UUIBooleanInputBaseElement.styles,
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        --uui-toggle-size: 18px;
        --uui-toggle-switch-width: calc(2 * var(--uui-toggle-size));
      }

      #slider {
        position: relative;
        grid-area: 'input';
        display: flex;
        align-items: center;

        width: var(--uui-toggle-switch-width);
        height: var(--uui-toggle-size);
        border-radius: 100px;

        background-color: var(
          --uui-toggle-background-color,
          var(--uui-interface-surface-alt)
        );
        border: 1px solid
          var(--uui-toggle-border-color, var(--uui-interface-border));
        font-size: calc(var(--uui-toggle-size) * 0.6);
      }
      label:hover input:not([disabled]) + #slider {
        border-color: var(
          --uui-toggle-border-color-hover,
          var(--uui-interface-border-hover)
        );
        background-color: var(
          --uui-toggle-background-color-hover,
          var(--uui-interface-surface-alt-hover)
        );
      }
      label:focus #slider {
        border-color: var(
          --uui-toggle-border-color-focus,
          var(--uui-interface-border-focus)
        );
        background-color: var(
          --uui-toggle-background-color-focus,
          var(--uui-interface-surface-alt-focus)
        );
      }
      input:checked + #slider {
        background-color: var(--uui-interface-select);
      }
      label:hover input:checked:not([disabled]) + #slider {
        background-color: var(--uui-interface-select-hover);
      }
      label:focus input:checked + #slider {
        background-color: var(--uui-interface-select-focus);
      }

      #icon-check,
      #icon-wrong {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition: fill 120ms;
      }

      #icon-check {
        margin-left: -0.5em;
        left: calc(var(--uui-toggle-size) * 0.5);
        fill: var(--uui-interface-contrast);
      }

      #icon-wrong {
        margin-right: -0.5em;
        right: calc(var(--uui-toggle-size) * 0.5);
        fill: var(--uui-interface-contrast);
      }
      input:checked + #slider #icon-check {
        fill: var(--uui-interface-select-contrast);
      }

      #slider::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--uui-toggle-size) - 4px);
        height: calc(var(--uui-toggle-size) - 4px);
        border-radius: 100px;
        background-color: var(--uui-interface-select-contrast);
        transition: width 120ms ease, left 120ms ease, transform 120ms ease,
          background-color 120ms;
      }

      input:checked + #slider::after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }

      :host(:not([disabled])) label:active #slider::after {
        /** Stretch when mouse down */
        width: calc(1.06 * var(--uui-toggle-size));
      }

      :host([disabled]) #slider {
        background-color: var(--uui-interface-surface-alt-disabled);
      }
      :host([disabled]) input:checked + #slider {
        background-color: var(--uui-interface-select-disabled);
      }
      :host([disabled]) #slider::after {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #slider #icon-wrong {
        fill: var(--uui-interface-contrast-disabled);
      }
      :host([disabled]) label:active #slider {
        animation: ${UUIHorizontalShakeAnimationValue};
      }
      :host([disabled]) input:checked + #slider #icon-check {
        fill: var(--uui-interface-select-contrast-disabled);
      }

      :host([error]) #slider {
        border: 1px solid var(--uui-look-danger-border, #d42054);
      }

      :host([error]) label:hover #slider {
        border: 1px solid var(--uui-look-danger-border, #d42054);
      }
    `,
  ];

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  constructor() {
    super('switch');
  }

  renderCheckbox() {
    return html`
      <div id="slider">
        <div id="icon-check">${iconCheck}</div>
        <div id="icon-wrong">${iconWrong}</div>
      </div>
    `;
  }
}

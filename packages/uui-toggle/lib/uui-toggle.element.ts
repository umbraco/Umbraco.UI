import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '@umbraco-ui/uui-base/lib/animations';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUIBooleanInputElement } from '@umbraco-ui/uui-boolean-input/lib';
import {
  iconCheck,
  iconRemove,
} from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import { css, html } from 'lit';

/**
 *  Umbraco Toggle-switch, toggles between off/on. Technically a checkbox.
 *  @element uui-toggle
 *  @fires UUIBooleanInputEvent#change- fires when the element is begin checked by a user action
 *  @cssprop --uui-toggle-size - Define the toggle size.
 *  @cssprop --uui-toggle-switch-width - Define the slider width.
 *  @cssprop --uui-toggle-background-color - Set the toggle background color
 *  @cssprop --uui-toggle-border-color - Set the toggle border color
 *  @cssprop --uui-toggle-border-color-hover - Set the toggle background color when hovered
 *  @cssprop --uui-toggle-background-color-hover - Set the toggle background color when hovered
 *  @cssprop --uui-toggle-border-color-focus - Set the toggle background color when focused
 *  @cssprop --uui-toggle-background-color-focus - Set the toggle background color when focused
 *  @extends UUIBooleanInputElement
 */
@defineElement('uui-toggle')
export class UUIToggleElement extends UUIBooleanInputElement {
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
      <div id="toggle">
        <div id="icon-checked">${iconCheck}</div>
        <div id="icon-unchecked">${iconRemove}</div>
      </div>
    `;
  }

  static styles = [
    ...UUIBooleanInputElement.styles,
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        --uui-toggle-size: 18px;
        --uui-toggle-switch-width: calc(2 * var(--uui-toggle-size));
      }

      #toggle {
        position: relative;
        grid-area: 'input';
        display: flex;
        align-items: center;

        flex-shrink: 0;

        width: var(--uui-toggle-switch-width);
        height: var(--uui-toggle-size);
        border-radius: 100px;

        background-color: var(
          --uui-toggle-background-color,
          var(--uui-color-border)
        );
        border: 1px solid
          var(--uui-toggle-border-color, var(--uui-color-border-standalone));
        font-size: calc(var(--uui-toggle-size) * 0.6);
      }

      label:hover input:not([disabled]) ~ #toggle {
        border-color: var(
          --uui-toggle-border-color-hover,
          var(--uui-color-border-emphasis)
        );
        background-color: var(
          --uui-toggle-background-color-hover,
          var(--uui-color-border)
        );
      }

      label:focus #toggle {
        border-color: var(
          --uui-toggle-border-color-focus,
          var(--uui-color-focus)
        );
        background-color: var(
          --uui-toggle-background-color-focus,
          var(--uui-color-surface-emphasis)
        );
      }

      input:checked ~ #toggle {
        background-color: var(--uui-color-selected);
      }
      input:checked ~ #toggle::after {
        border-color: var(--uui-color-selected-standalone);
      }

      label:hover input:checked:not([disabled]) ~ #toggle {
        background-color: var(--uui-color-selected-emphasis);
      }

      label:focus input:checked ~ #toggle {
        background-color: var(--uui-color-selected-emphasis);
      }

      #icon-checked,
      #icon-unchecked {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition: color 120ms;
        svg {
          stroke-width: 2.5;
        }
      }

      #icon-checked {
        margin-left: -0.45em;
        left: calc((var(--uui-toggle-size) + 1px) * 0.5);
        color: var(--uui-color-interactive);
      }

      #icon-unchecked {
        margin-right: -0.5em;
        right: calc((var(--uui-toggle-size) + 1px) * 0.5);
        color: var(--uui-color-interactive);
      }

      input:checked ~ #toggle #icon-checked {
        color: var(--uui-color-selected-contrast);
      }

      #toggle::after {
        content: '';
        position: absolute;
        top: 1px;
        left: 1px;
        width: calc(var(--uui-toggle-size) - 2px);
        height: calc(var(--uui-toggle-size) - 2px);
        border-radius: 100px;
        background-color: var(--uui-color-selected-contrast);
        border: 1px solid var(--uui-color-border-standalone);
        box-sizing: border-box;
        transition:
          width 120ms ease,
          left 120ms ease,
          transform 120ms ease,
          background-color 120ms;
      }

      input:checked ~ #toggle::after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }

      input:focus ~ #toggle {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      :host(:not([disabled], [readonly])) label:active #toggle::after {
        /** Stretch when mouse down */
        width: calc(1.06 * var(--uui-toggle-size));
      }

      :host([disabled]) #toggle {
        background-color: var(--uui-color-disabled-standalone);
      }
      :host([disabled]) input:checked ~ #toggle {
        background-color: var(--uui-color-disabled-contrast);
      }
      :host([disabled]) #toggle::after {
        background-color: var(--uui-color-disabled);
      }
      :host([disabled]) #toggle #icon-unchecked {
        color: var(--uui-color-disabled-contrast);
      }
      :host([disabled]) label:active #toggle {
        animation: ${UUIHorizontalShakeAnimationValue};
      }
      :host([disabled]) input:checked #toggle #icon-checked {
        color: var(--uui-color-disabled-contrast);
      }

      :host(:not([pristine]):invalid) #toggle,
      :host(:not([pristine]):invalid) label:hover #toggle,
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) #toggle,
      :host(:not([pristine])[internals-invalid]) label:hover #toggle {
        border: 1px solid var(--uui-color-invalid-standalone);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-toggle': UUIToggleElement;
  }
}

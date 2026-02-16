import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '@umbraco-ui/uui-base/lib/animations';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUIBooleanInputElement } from '@umbraco-ui/uui-boolean-input/lib';
import { css, html, svg } from 'lit';

// Custom SVG for the checkbox, as this is smaller in size than the icon registry version: [NL]
const check = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 10 17 4 12" /></svg>`;
const subtract = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12.25h14" /></svg>`;

/**
 *  Umbraco checkbox, toggles between checked and uncheck
 *  @element uui-checkbox
 *  @fires UUIBooleanInputEvent#change - fires when the element is begin checked by a user action
 *  @cssprop --uui-checkbox-size - To set the size of the checkbox.
 *  @extends UUIBooleanInputElement
 */
@defineElement('uui-checkbox')
export class UUICheckboxElement extends UUIBooleanInputElement {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  renderCheckbox() {
    return html`
      <div id="ticker">
        <div id="icon-check">${this.indeterminate ? subtract : check}</div>
      </div>
    `;
  }

  static styles = [
    ...UUIBooleanInputElement.styles,
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        --uui-checkbox-size: 18px;
      }

      #ticker {
        position: relative;
        grid-area: 'input';
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        box-sizing: border-box;
        width: var(--uui-checkbox-size);
        height: var(--uui-checkbox-size);
        border-radius: var(
          --uui-checkbox-border-radius,
          var(--uui-border-radius-1)
        );

        color: var(--uui-toggle-color, var(--uui-color-selected-contrast));
        background-color: var(
          --uui-toggle-background-color,
          var(--uui-color-surface)
        );
        border: 1px solid
          var(--uui-checkbox-border-color, var(--uui-color-border-standalone));
        font-size: calc(var(--uui-checkbox-size) * 0.7);
      }
      label:hover input:not([disabled]) + #ticker {
        border-color: var(
          --uui-checkbox-border-color-hover,
          var(--uui-color-border-emphasis)
        );
        background-color: var(
          --uui-checkbox-background-color-hover,
          var(--uui-color-surface-emphasis)
        );
      }
      label:focus #ticker {
        border-color: var(
          --uui-checkbox-border-color-focus,
          var(--uui-color-border-emphasis)
        );
        background-color: var(
          --uui-checkbox-background-color-focus,
          var(--uui-color-surface-emphasis)
        );
      }
      input:checked:not([disabled]) + #ticker,
      input:indeterminate:not([disabled]) + #ticker {
        border-color: var(--uui-color-selected);
      }

      label:hover input:checked:not([disabled]) + #ticker,
      label:hover input:indeterminate:not([disabled]) + #ticker {
        border-color: var(--uui-color-selected-emphasis);
      }

      label:focus input:checked + #ticker,
      label:focus input:indeterminate + #ticker {
        border-color: var(--uui-color-selected-emphasis);
      }

      #icon-check {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 1.3em;
        transition:
          transform 80ms ease-in-out,
          fill 120ms,
          opacity 120ms;
        color: var(--uui-color-selected-contrast);
        opacity: 0;
      }

      #ticker::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: calc(
          var(--uui-checkbox-border-radius, var(--uui-border-radius-1))
        );
        background-color: var(--uui-color-selected);
        transition:
          transform 80ms ease-in-out,
          opacity 80ms,
          background-color 80ms;
        transform: scale(0);
        opacity: 0;
      }
      label:hover input:checked:not([disabled]) + #ticker::before,
      label:hover input:indeterminate:not([disabled]) + #ticker::before {
        background-color: var(--uui-color-selected-emphasis);
      }

      input:checked + #ticker::before,
      input:indeterminate + #ticker::before {
        transform: scale(1);
        opacity: 1;
      }
      input:checked + #ticker #icon-check,
      input:indeterminate + #ticker #icon-check {
        opacity: 1;
      }
      label:focus input:checked + #ticker,
      label:focus input:indeterminate + #ticker {
        background-color: var(--uui-color-selected-emphasis);
      }

      input:focus + #ticker {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      :host(:not([disabled], [readonly]))
        label:active
        input:checked
        + #ticker
        #icon-check {
        /** Stretch when mouse down */
        transform: scale(0.9);
      }

      :host(:not([disabled], [readonly]))
        label:active
        input:indeterminate
        + #ticker
        #icon-check {
        /** Stretch when mouse down */
        transform: scale(0.9);
      }

      :host(:not([pristine]):invalid) #ticker,
      :host(:not([pristine]):invalid) label:hover #ticker,
      :host(:not([pristine]):invalid) label:hover input:checked:not([disabled]) + #ticker,
      :host(:not([pristine]):invalid) label:hover input:indeterminate:not([disabled]) + #ticker,
      :host(:not([pristine]):invalid) label:focus input:checked + #ticker,
      :host(:not([pristine]):invalid) label:focus input:indeterminate + #ticker,
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) #ticker,
      :host(:not([pristine])[internals-invalid]) label:hover #ticker,
      :host(:not([pristine])[internals-invalid]) label:hover input:checked:not([disabled]) + #ticker,
      :host(:not([pristine])[internals-invalid]) label:hover input:indeterminate:not([disabled]) + #ticker,
      :host(:not([pristine])[internals-invalid]) label:focus input:checked + #ticker,
      :host(:not([pristine])[internals-invalid]) label:focus input:indeterminate + #ticker {
        border: 1px solid var(--uui-color-invalid-standalone);
      }

      :host([disabled]) #ticker {
        background-color: var(--uui-color-disabled);
      }
      :host([disabled]) input:checked + #ticker {
        background-color: var(--uui-color-disabled);
      }
      :host([disabled]) input:indeterminate + #ticker {
        background-color: var(--uui-color-disabled);
      }
      :host([disabled]) #ticker::before {
        background-color: var(--uui-color-disabled);
      }
      :host([disabled]) #ticker #icon-check {
        color: var(--uui-color-disabled-contrast);
      }
      :host([disabled]) label:active #ticker {
        animation: ${UUIHorizontalShakeAnimationValue};
      }
      :host([disabled]) input:checked + #ticker #icon-check,
      :host([disabled]) input:indeterminate + #ticker #icon-check {
        color: var(--uui-color-disabled-contrast);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-checkbox': UUICheckboxElement;
  }
}

import { html, css } from 'lit-element';
import {
  UUIHorizontalShakeKeyframes,
  UUIHorizontalShakeAnimationValue,
} from '../../../animations/uui-shake';
import { iconCheck } from './checkbox-icons';
import { UUICheckboxBaseElement } from './uui-checkbox-base.element';

/**
 *  @element uui-toggle
 *  @fires {UUICheckboxEvent} change - fires when the element is begin checked by a user action
 *  @slot - to overwrite displayed label content
 *  @description - A Umbraco Toggle-switch, toggles between off/on
 */
export class UUICheckboxElement extends UUICheckboxBaseElement {
  static styles = [
    ...UUICheckboxBaseElement.styles,
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        --uui-checkbox-size: 18px;
        /*
        --uui-toggle-focus-outline: 0 0 1px 1.5px var(--uui-color-violet-blue);
        */
      }

      #ticker {
        position: relative;
        grid-area: center;
        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;
        width: var(--uui-checkbox-size);
        height: var(--uui-checkbox-size);
        border-radius: var(
          --uui-checkbox-border-radius,
          var(--uui-size-border-radius)
        );

        color: var(--uui-toggle-color, var(--uui-interface-selected-contrast));
        background-color: var(
          --uui-toggle-background-color,
          var(--uui-interface-surface)
        );
        border: 1px solid
          var(--uui-checkbox-border-color, var(--uui-interface-border));
        font-size: calc(var(--uui-checkbox-size) * 0.7);
      }
      label:hover input:not([disabled]) + #ticker {
        border-color: var(
          --uui-checkbox-border-color-hover,
          var(--uui-interface-border-hover)
        );
        background-color: var(
          --uui-checkbox-background-color-hover,
          var(--uui-interface-surface-hover)
        );
      }
      label:focus #ticker {
        border-color: var(
          --uui-checkbox-border-color-focus,
          var(--uui-interface-border-focus)
        );
        background-color: var(
          --uui-checkbox-background-color-focus,
          var(--uui-interface-surface-alt-focus)
        );
      }
      input:checked + #ticker {
        border-color: var(--uui-interface-selected);
      }
      label:hover input:checked:not([disabled]) + #ticker {
        border-color: var(--uui-interface-selected-hover);
      }
      label:focus input:checked + #ticker {
        border-color: var(--uui-interface-selected-focus);
      }

      #icon-check {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition: fill 120ms, opacity 120ms;
        fill: var(--uui-interface-selected-contrast);
        opacity: 0;
      }

      /** before? */

      #ticker:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: calc(
          var(--uui-checkbox-border-radius, var(--uui-size-border-radius)) * 0.5
        );
        background-color: var(--uui-interface-selected);
        transition: transform 120ms ease, opacity 120ms, background-color 120ms;
        transform: scale(0);
        opacity: 0;
      }
      label:hover input:checked:not([disabled]) + #ticker:before {
        background-color: var(--uui-interface-selected-hover);
      }

      input:checked + #ticker:before {
        transform: scale(1);
        opacity: 1;
      }
      input:checked + #ticker #icon-check {
        opacity: 1;
      }
      label:focus input:checked + #ticker {
        background-color: var(--uui-interface-selected-focus);
      }

      :host(:not([disabled])) label:active input:checked + #ticker:before {
        /** Stretch when mouse down */
        transform: scale(0.9);
      }

      :host([disabled]) #ticker {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) input:checked + #ticker {
        background-color: var(--uui-interface-selected-disabled);
      }
      :host([disabled]) #ticker:after {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #ticker #icon-check {
        fill: var(--uui-interface-contrast-disabled);
      }
      :host([disabled]) label:active #ticker {
        animation: ${UUIHorizontalShakeAnimationValue};
      }
      :host([disabled]) input:checked + #ticker #icon-check {
        fill: var(--uui-interface-selected-contrast-disabled);
      }

      /*
      input:focus + #slider,
      input:not([disabled]) + label:active #slider {
        box-shadow: var(--uui-toggle-focus-outline);
      }
      */
    `,
  ];

  static readonly formAssociated = true;

  renderCheckbox() {
    return html`
      <div id="ticker">
        <div id="icon-check">${iconCheck}</div>
      </div>
    `;
  }
}

//

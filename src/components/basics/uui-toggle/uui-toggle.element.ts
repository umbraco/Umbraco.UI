import { html, css } from 'lit-element';
import {
  UUIHorizontalShakeKeyframes,
  UUIHorizontalShakeAnimationValue,
} from '../../../animations/uui-shake';
import { iconWrong, iconCheck } from './toggle-icons';
import { UUICheckboxBaseElement } from '../uui-checkbox/uui-checkbox-base.element';

// TODO - validation - required option??? does it even make sense? if so what it should output. make it possible that it has to be checked.

/**
 *  @element uui-toggle
 *  @fires {UUICheckboxEvent} change - fires when the element is begin checked by a user action
 *  @slot - to overwrite displayed label content
 *  @description - A Umbraco Toggle-switch, toggles between off/on
 */
export class UUIToggleElement extends UUICheckboxBaseElement {
  static styles = [
    ...UUICheckboxBaseElement.styles,
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        --uui-toggle-size: 18px;
        --uui-toggle-switch-width: calc(2 * var(--uui-toggle-size));
        /*
        --uui-toggle-focus-outline: 0 0 1px 1.5px var(--uui-color-violet-blue);
        */
      }

      #slider {
        position: relative;
        grid-area: center;
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
        background-color: var(--uui-interface-selected);
      }
      label:hover input:checked:not([disabled]) + #slider {
        background-color: var(--uui-interface-selected-hover);
      }
      label:focus input:checked + #slider {
        background-color: var(--uui-interface-selected-focus);
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
        fill: var(--uui-interface-selected-contrast);
      }

      #slider:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--uui-toggle-size) - 4px);
        height: calc(var(--uui-toggle-size) - 4px);
        border-radius: 100px;
        background-color: var(--uui-interface-selected-contrast);
        transition: width 120ms ease, left 120ms ease, transform 120ms ease,
          background-color 120ms;
      }

      input:checked + #slider:after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }

      :host(:not([disabled])) label:active #slider:after {
        /** Stretch when mouse down */
        width: calc(1.06 * var(--uui-toggle-size));
      }

      :host([disabled]) #slider {
        background-color: var(--uui-interface-surface-alt-disabled);
      }
      :host([disabled]) input:checked + #slider {
        background-color: var(--uui-interface-selected-disabled);
      }
      :host([disabled]) #slider:after {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #slider #icon-wrong {
        fill: var(--uui-interface-contrast-disabled);
      }
      :host([disabled]) label:active #slider {
        animation: ${UUIHorizontalShakeAnimationValue};
      }
      :host([disabled]) input:checked + #slider #icon-check {
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

  static formAssociated = true;

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

import { LitElement, html, css, property } from 'lit-element';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
  InterfaceLookCSSCreator,
} from '../../../type/InterfaceLook';
import { Size } from '../../../type/Size';

/**
 *  @element uui-badge
 *  @slot - for badge contents
 */
export class UUIBadgeElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-family: inherit;
        line-height: 1;
        font-size: var(--uui-badge-font-size, 0.9em);
        margin: var(--uui-badge-margin, var(--uui-size-base-unit));
        padding: var(--uui-badge-size-unit, var(--uui-size-base-unit))
          calc(var(--uui-badge-size-unit, var(--uui-size-base-unit)) * 3);
        border-radius: calc(
          var(--uui-badge-size-unit, var(--uui-size-base-unit)) * 2
        );
        background-color: var(--uui-interface-background);
        color: var(--uui-interface-contrast);

        transition: background-color 120ms, color 120ms;
      }

      :host([size='xs']) {
        --uui-badge-size-unit: 4px;
        --uui-badge-font-size: 10px;
      }
      :host([size='s']) {
        --uui-badge-size-unit: 4px;
        --uui-badge-font-size: 11px;
      }
      :host([size='m']) {
        --uui-badge-size-unit: 5px;
        --uui-badge-font-size: 14px;
      }
      :host([size='l']) {
        --uui-badge-size-unit: 6px;
      }
      :host([size='xl']) {
        --uui-badge-size-unit: 8px;
      }
    `,
    InterfaceLookCSSCreator(
      lookName =>
        css`
          :host([look='${lookName}']) {
            background-color: var(--uui-color-${lookName}-background);
            color: var(--uui-color-${lookName}-contrast);
          }
        `
    ),
  ];

  @property({ attribute: true })
  public size: Size = 'm';

  @property({ attribute: true })
  public look: InterfaceLookType = InterfaceLookDefaultValue;

  render() {
    return html` <slot></slot> `;
  }
}

import { LitElement, html, css, property } from 'lit-element';
import {
  InterfaceLookType,
  InterfaceLookCSSCreator,
} from '../../../type/InterfaceLook';

/**
 *  @element uui-badge
 *  @slot - for badge contents
 *  @description - A badge to notify that there is something that requires attention of the user.
 */
export class UUIBadgeElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        top: -8px;
        right: -8px;
        padding: 3px;

        text-align: center;
        font-size: 11px;
        line-height: 11px;
        font-weight: 900;

        margin-right: 0 !important;

        min-width: var(--uui-size-small);
        min-height: var(--uui-size-small);

        border-radius: var(--uui-size-small);
        background-color: var(
          --uui-badge-background-color,
          var(--uui-interface-surface)
        );
        color: var(--uui-badge-contrast, var(--uui-interface-contrast));
      }
    `,
    InterfaceLookCSSCreator(
      lookName =>
        css`
          :host([look='${lookName}']) {
            background-color: var(--uui-look-${lookName}-surface);
            color: var(--uui-look-${lookName}-contrast);
          }
        `
    ),
  ];

  @property({ reflect: true })
  look: InterfaceLookType = 'danger';

  render() {
    return html` <slot></slot> `;
  }
}

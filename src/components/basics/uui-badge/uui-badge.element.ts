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

//TODO this should be change to look better when it's not round
export class UUIBadgeElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;

        /* top: -8px;
        right: -8px; */
        padding: 3px 5px;
        --uui-badge-inset: -8px -8px auto auto;
        inset: var(--uui-badge-inset);

        text-align: center;
        font-size: 12px;
        line-height: 16px;
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
        display: flex;
        justify-content: center;
        align-items: center;
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

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

import { InterfaceLookType } from '@umbraco-ui/uui-base/lib/types';

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

        /* top: -8px;
        right: -8px; */
        padding: 3px 5px;
        --uui-badge-inset: -8px -8px auto auto;
        /* 4 different ones */
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

      :host([look='primary']) {
        background-color: var(--uui-look-primary-surface);
        color: var(--uui-look-primary-contrast);
      }

      :host([look='secondary']) {
        background-color: var(--uui-look-secondary-surface);
        color: var(--uui-look-secondary-contrast);
      }

      :host([look='outline']) {
        background-color: var(--uui-look-outline-surface);
        color: var(--uui-look-outline-contrast);
      }

      :host([look='placeholder']) {
        background-color: var(--uui-look-placeholder-surface);
        color: var(--uui-look-placeholder-contrast);
      }

      :host([look='positive']) {
        background-color: var(--uui-look-positive-surface);
        color: var(--uui-look-positive-contrast);
      }

      :host([look='warning']) {
        background-color: var(--uui-look-warning-surface);
        color: var(--uui-look-warning-contrast);
      }

      :host([look='danger']) {
        background-color: var(--uui-look-danger-surface);
        color: var(--uui-look-danger-contrast);
      }
    `,
  ];

  @property({ reflect: true })
  look: InterfaceLookType = 'danger';

  render() {
    return html` <slot></slot> `;
  }
}

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

import { InterfaceLookType } from '@umbraco-ui/uui-base/lib/types';

/**
 *  A badge to notify that there is something that requires attention of the user. The badge is positioned with `position: absolute`. It will determine its position against the first ancestor with `position: relative`.
 *  @element uui-badge
 *  @slot - for badge contents
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

        border-width: var(--uui-badge-border-width, 1px);
        border-style: solid;
        border-color: var(
          --uui-badge-border-color,
          var(--uui-interface-surface)
        );
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
        border-style: var(
          --uui-badge-border-style,
          var(--uui-look-primary-border-style, solid)
        );
        border-color: var(--uui-look-primary-border);
      }

      :host([look='secondary']) {
        background-color: var(--uui-look-secondary-surface);
        color: var(--uui-look-secondary-contrast);
        border-style: var(
          --uui-badge-border-style,
          var(--uui-look-secondary-border-style, solid)
        );
        border-color: var(--uui-look-secondary-border);
      }

      :host([look='outline']) {
        background-color: var(--uui-look-outline-surface);
        color: var(--uui-look-outline-contrast);
        border-style: var(
          --uui-badge-border-style,
          var(--uui-look-outline-border-style, solid)
        );
        border-color: var(--uui-look-outline-border);
      }

      :host([look='placeholder']) {
        background-color: var(--uui-look-placeholder-surface);
        color: var(--uui-look-placeholder-contrast);
        border-style: var(
          --uui-badge-border-style,
          var(--uui-look-placeholder-border-style, dashed)
        );
        border-color: var(--uui-look-placeholder-border);
      }

      :host([look='positive']) {
        background-color: var(--uui-look-positive-surface);
        color: var(--uui-look-positive-contrast);
        border-style: var(
          --uui-badge-border-style,
          var(--uui-look-positive-border-style, solid)
        );
        border-color: var(--uui-look-positive-border);
      }

      :host([look='warning']) {
        background-color: var(--uui-look-warning-surface);
        color: var(--uui-look-warning-contrast);
        border-style: var(
          --uui-badge-border-style,
          var(--uui-look-warning-border-style, solid)
        );
        border-color: var(--uui-look-warning-border);
      }

      :host([look='danger']) {
        background-color: var(--uui-look-danger-surface);
        color: var(--uui-look-danger-contrast);
        border-style: var(
          --uui-badge-border-style,
          var(--uui-look-danger-border-style, solid)
        );
        border-color: var(--uui-look-danger-border);
      }
    `,
  ];

  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {""|"primary"|"secondary"|"outline"|"placeholder"|"positive"|"warning"|"danger"}
   * @attr
   * @default danger
   */
  @property({ type: String, reflect: true })
  look: InterfaceLookType = 'danger';

  render() {
    return html` <slot></slot> `;
  }
}

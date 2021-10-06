import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
  InterfaceLookCSSCreator,
  Size,
} from '@umbraco-ui/uui-base/types';

/**
 *  @element uui-tag
 *  @slot - for tag contents
 *  @description Tag component from Umbraco UI components library.
 *  @cssprop --uui-tag-font-size - Define the components font size.
 */
export class UUITagElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-family: inherit;
        font-weight: 700;
        line-height: 1.1;

        font-size: var(--uui-tag-font-size, 0.9em);
        margin: var(--uui-tag-margin, var(--uui-size-base-unit));

        padding: calc(var(--uui-tag-font-size) / 2.3) var(--uui-tag-font-size);
        border-radius: 1000px;
        background-color: var(--uui-interface-surface-alt);
        color: var(--uui-interface-contrast);
        user-select: none;

        transition: background-color 120ms, color 120ms;
      }

      slot {
        display: flex;
        align-items: center;
      }

      :host([size='xs']) {
        --uui-tag-font-size: 10px;
      }
      :host([size='s']) {
        --uui-tag-font-size: 11px;
      }
      :host([size='m']) {
        --uui-tag-font-size: 12px;
      }
      :host([size='l']) {
        --uui-tag-font-size: 13px;
      }
      :host([size='xl']) {
        --uui-tag-font-size: 14px;
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

  /**
   * Defines the size of the tag.
   * @type {'xs' | 's' | 'm' | 'l' | 'xl'}
   * @attr
   * @default m
   */
  @property({ reflect: true })
  public size: Size = 'm';

  /**
   * Defines the look of the tag.
   * @type {'primary'|'secondary'|'outline'|'placeholder'|'positive'|'warning'|'danger'}
   * @attr
   * @default ''
   */
  @property({ reflect: true })
  public look: InterfaceLookType = InterfaceLookDefaultValue;

  render() {
    return html`<slot></slot>`;
  }
}

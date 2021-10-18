import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
  Size,
} from '@umbraco-ui/uui-base/lib/types';

/**
 *  Tag component from Umbraco UI components library. Comes in one shape, but different looks and sizes
 *  @element uui-tag
 *  @slot - for tag contents
 *  @cssprop --uui-tag-font-size - Set the components font size. Setting this property overwrites what comes from size attribute.
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

      /* Looks */
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
        border: 1px solid var(--uui-look-outline-border);
      }

      :host([look='placeholder']) {
        background-color: var(--uui-look-placeholder-surface);
        color: var(--uui-look-placeholder-contrast);
        border: 1px dashed var(--uui-look-placeholder-border);
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

  /**
   * Defines the size of the tag. It changes the `--uui-tag-font-size` value.
   * @type {'xs' | 's' | 'm' | 'l' | 'xl'}
   * @attr
   * @default m
   */
  @property({ reflect: true })
  public size: Size = 'm';

  /**
   * Defines the look of the tag.
   * @type {''|'primary'|'secondary'|'outline'|'placeholder'|'positive'|'warning'|'danger'}
   * @attr
   * @default ''
   */
  @property({ reflect: true })
  public look: InterfaceLookType = InterfaceLookDefaultValue;

  render() {
    return html`<slot></slot>`;
  }
}

import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
} from '@umbraco-ui/uui-base/lib/types';

/**
 *
 *  @element uui-tag
 *  @description Tag component from Umbraco UI components library. Comes in one shape, but different looks and sizes
 *  @slot - for tag contents
 *  @cssprop --uui-tag-font-size - overwrite the default font-size for the tag.
 */
@defineElement('uui-tag')
export class UUITagElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-size: var(--uui-tag-font-size, var(--uui-type-small-size));
        font-weight: 700;
        line-height: 1;
        padding: var(--uui-size-space-1) calc(var(--uui-size-space-1) + 0.5em);
        border-radius: 100px;
        background-color: var(--uui-interface-surface-alt);
        color: var(--uui-interface-contrast);
        user-select: none;
      }

      slot {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2px;
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

declare global {
  interface HTMLElementTagNameMap {
    'uui-tag': UUITagElement;
  }
}

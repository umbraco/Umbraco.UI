import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUICardElement } from '../uui-card/uui-card.element';

/**
 *  @element uui-package-card
 *  @fires {UUICardEvent} click-title - fires when the media card title is clicked
 *  @description - Card component for displaying a package.
 */

export class UUIPackageCardElement extends UUICardElement {
  static styles = [
    ...UUICardElement.styles,
    css`
      :host {
        min-width: 250px;
      }
      /*

      :host([type='node']),


      slot[name='asset']::slotted(img) {
        align-self: center;
        border-radius: var(--uui-size-border-radius, 3px);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      :host([type='user'], [type='node'])
        ::slotted(:not(uui-avatar, uui-tag, uui-badge)) {
        font-size: var(--uui-size-small, 12px);
        line-height: calc(2 * var(--uui-size-xsmall, 9px));
      }

      :host([type='user']) ::slotted(*) {
        text-align: center;
      }

      slot[name='asset']::slotted(uui-icon) {
        align-self: center;
        font-size: var(--uui-size-xlarge);
        // change this color to something more suitable
        color: var(--uui-interface-contrast-disabled);
        transform: translateY(
          calc(
            -1 * var(--uui-size-medium, 24px) + var(--uui-size-base-unit, 6px) *
              2
          )
        );
      }

      slot[name='asset']::slotted(uui-file-icon) {
        align-self: center;
        margin: var(--uui-size-xlarge);
        width: 80%;

        transform: translateY(
          calc(
            -1 * var(--uui-size-medium, 24px) + var(--uui-size-base-unit, 6px) *
              2
          )
        );
      }

      slot[name='tag']::slotted(uui-tag) {
        position: absolute;
        top: 6px;
        right: 6px;
      }

      slot[name='avatar']::slotted(uui-avatar) {
        margin-bottom: 12px;
      }

      #card-content {
        width: 100%;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-between;
      }

      :host([type='node']) #card-content,
      :host([type='user']) #card-content {
        padding: var(--uui-size-space-3, 12px);
      }

      :host([type='user']) #card-content {
        align-items: center;
      }

      #title-area {
        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
      }

      slot[name='icon']::slotted(uui-icon) {
        font-size: 1.2em;
      }

      :host([type='user']) #title-area {
        margin: 0 0 3px 0;
      }

      #title-area > span {
        vertical-align: center;
        margin-left: 0.5em;
        margin-top: 3px;
      }

      #title-area:hover,
      #title-area:focus {
        text-decoration: underline;
        outline-color: #6ab4f0;
      }

      #details {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-white, #ffff);
        color: var(--uui-color-black, #0000);
        opacity: 0;
        border-radius: 0 0 var(--uui-size-border-radius, 3px)
          var(--uui-size-border-radius, 3px);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: var(--uui-size-small, 12px);
        box-sizing: border-box;
        padding: var(--uui-size-base-unit, 6px) var(--uui-size-small, 12px);
        transition: opacity 120ms;
      }

      :host([type='file']) #details {
        opacity: 0.9;
        border-top: 1px solid rgba(0, 0, 0, 0.04);
      }

      :host(:hover) #details,
      :host(:focus, :focus-within) #details {
        opacity: 0.9;
      }

      :host([selected]) #details {
        opacity: 0.9;
      }

      #info-icon {
        margin-right: var(--uui-size-base-unit, 6px);
        display: flex;
        height: var(--uui-size-medium, 24px);
      }

      #details:hover,
      #details:focus {
        text-decoration: underline;
        outline-color: #6ab4f0;
      }
      */
    `,
  ];

  @property({ type: String })
  name = '';

  public render() {
    return html`TO BE DONE`;
  }
}

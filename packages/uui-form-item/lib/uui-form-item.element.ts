import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

// TODO: Make sure validation messages can be seen for the whole Form Item. Make them follow the screen if form controls are taller than available screen height.

/**
 * @element uui-form-item
 * @description - Form item composes label, input and validation-messages in a proper layout.
 */

@defineElement('uui-form-item')
export class UUIFormItemElement extends LitElement {
  static styles = [
    css`
      :host {
        /* Styles goes here */
      }
    `,
  ];

  render() {
    return html`
      <uui-form-validation-message>
        <slot></slot>
      </uui-form-validation-message>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-form-item': UUIFormItemElement;
  }
}

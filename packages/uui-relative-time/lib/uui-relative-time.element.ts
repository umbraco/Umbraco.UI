import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 * @element uui-relative-time
 */
@defineElement('uui-relative-time')
export class UUIRelativeTimeElement extends LitElement {
  render() {
    return html` Markup goes here `;
  }

  static styles = [
    css`
      :host {
        /* Styles goes here */
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-relative-time': UUIRelativeTimeElement;
  }
}

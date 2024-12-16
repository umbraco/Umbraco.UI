import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 * @element uui-copy
 */
@defineElement('uui-copy')
export class UUICopyElement extends LitElement {
      static styles = [
    css`
      :host {
        /* Styles goes here */
      }
    `,
  ];

    render(){
        return html`
            Markup goes here
        `;
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-copy': UUICopyElement;
  }
}

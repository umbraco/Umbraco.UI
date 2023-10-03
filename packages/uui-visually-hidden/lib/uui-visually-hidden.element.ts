import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 * @element uui-visually-hidden
 */
@defineElement('uui-visually-hidden')
export class UUIVisuallyHiddenElement extends LitElement {
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
    'uui-visually-hidden': UUIVisuallyHiddenElement ;
  }
}

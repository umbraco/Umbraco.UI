import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 * @element uui-select-country
 */
@defineElement('uui-select-country')
export class UUISelectCountryElement extends LitElement {
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
    'uui-select-country': UUISelectCountryElement ;
  }
}

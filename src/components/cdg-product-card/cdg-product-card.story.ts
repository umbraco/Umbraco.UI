import { html } from 'lit-element';
import './index';

export default {
  title: 'Misc/CDG Product Card',
  component: 'uui-product-card',
};

export const Basic = () =>
  html`<uui-card-grid>
    <cdg-product-card
      ><img src="/src/components/uui-product-card/product.jpg"
    /></cdg-product-card>
    <cdg-product-card name="Product name" price="10.000DKK"
      ><img src="https://www.placecage.com/c/300/300"
    /></cdg-product-card>
  </uui-card-grid>`;

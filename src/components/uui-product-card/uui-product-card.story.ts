import { html } from 'lit-element';
import './index';

export default {
  title: 'Misc/CDG Product Card',
  component: 'uui-product-card',
};

export const Basic = () =>
  html`<div style="width: 30vw">
    <uui-product-card
      ><img src="/src/components/uui-product-card/product.jpg"
    /></uui-product-card>
  </div>`;

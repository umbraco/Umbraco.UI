import { html } from 'lit-element';
import './index';

export default {
  title: 'Misc/CDG Product Card',
  component: 'uui-product-card',
};

export const Basic = () =>
  html`<div style="width: 40vw">
      <uui-product-card
        ><img src="/src/components/uui-product-card/product.jpg"
      /></uui-product-card>
    </div>
    <div style="width: 40vw; margin-top: 2rem;">
      <uui-product-card available
        ><img src="https://www.placecage.com/c/300/300"
      /></uui-product-card>
    </div>`;

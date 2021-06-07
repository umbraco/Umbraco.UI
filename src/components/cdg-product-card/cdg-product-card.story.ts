import { html } from 'lit-element';

export default {
  title: 'Misc/CDG Product Card',
  component: 'cdg-product-card',
};

export const Default = () => html` <div
  style="position:relative; width:10px; height:10px;"
>
  <cdg-product-card>!</cdg-product-card>
</div>`;

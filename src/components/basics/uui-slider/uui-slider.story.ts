import { html } from 'lit-html';
import '.';

export default {
  title: 'Basics/Slider',
  component: 'uui-slider',
};

export const Basic = () => html` <uui-slider label="Slider"></uui-slider> `;

export const Steps = () => html`
  <uui-slider label="Slider" min="-10" max="10" step="1">20 steps</uui-slider>

  <uui-slider label="Slider" step="10">10 steps</uui-slider>

  <uui-slider label="Slider" step="4">25 steps</uui-slider>

  <uui-slider label="Slider" step="1">100 steps</uui-slider>
`;

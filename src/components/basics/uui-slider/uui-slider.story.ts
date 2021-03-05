import { html } from 'lit-html';
import '.';

export default {
  title: 'Basics/Slider',
  component: 'uui-slider',
};

export const Default = () => html`
  <uui-slider label="Slider"></uui-slider>
  <uui-slider label="Slider" min="-10" max="10" step="1"></uui-slider>
  <uui-slider label="Slider" step="10"></uui-slider>
  <uui-slider label="Slider" step="1"></uui-slider>
`;

export const LabelInTheSlot = () => html` <uui-slider> Slider</uui-slider> `;

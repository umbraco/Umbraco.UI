import { html } from 'lit-html';
import '.';

export default {
  title: 'Basics/Slider',
  component: 'uui-slider',
};

export const Default = () => html` <uui-slider label="Slider"></uui-slider> `;

export const LabelInTheSlot = () => html` <uui-slider> Slider</uui-slider> `;

import { html } from 'lit-html';
export default {
  title: 'Basics/Slider',
  component: 'uui-slider',
};

export const Basic = () => html` <uui-slider label="Slider"></uui-slider> `;

export const Steps = () => html`
  <uui-slider label="Slider" min="-10" max="10" step="1"
    >This input has 20 steps</uui-slider
  >

  <uui-slider label="Slider" step="10">This input has 10 steps</uui-slider>

  <uui-slider label="Slider" step="4">This input has 25 steps</uui-slider>

  <uui-slider label="Slider" step="1">This input has 100 steps</uui-slider>
`;

export const WithOthers = () =>
  html`<uui-radio-group
      ><uui-radio>Option</uui-radio><uui-radio>Option</uui-radio
      ><uui-radio>Option</uui-radio></uui-radio-group
    >
    <br />
    <uui-slider label="Slider" step="10">Rate Yourself</uui-slider> <br />
    <uui-toggle>Do I look nice?</uui-toggle> <br />
    <uui-checkbox>Apple</uui-checkbox> <uui-checkbox>Chocolate</uui-checkbox>
    <uui-checkbox>Milk</uui-checkbox>`;

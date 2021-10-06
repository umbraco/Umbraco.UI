import { html } from 'lit-html';
import '@umbraco-ui/uui-slider/lib/index';
import { Story } from '@storybook/web-components';
export default {
  title: 'Inputs/Slider',
  component: 'uui-slider',
  args: {
    min: 0,
    max: 100,
    step: 10,
    label: 'slider',
  },
};

export const Overview: Story = props =>
  html`
    Reload is necessary for some properties to update.
    <uui-slider
      label=${props.label}
      step=${props.step}
      min=${props.min}
      max=${props.max}
      >${props.slot}</uui-slider
    >
  `;

Overview.args = {
  slot: 'I am a slider',
};

export const Steps: Story = props => html`
  Reload is necessary for some properties to update.
  <uui-slider
    label=${props.label}
    step=${props.step}
    min=${props.min}
    max=${props.max}
    >${props.slot}</uui-slider
  >
  <h5>Steps</h5>
  <uui-slider label="Slider" min="-10" max="10" step="1"
    >This input has 20 steps</uui-slider
  >

  <uui-slider label="Slider" step="10">This input has 10 steps</uui-slider>

  <uui-slider label="Slider" step="4">This input has 25 steps</uui-slider>

  <uui-slider label="Slider" step="1">This input has 100 steps</uui-slider>
`;

Steps.args = {
  slot: 'I am a slider',
};

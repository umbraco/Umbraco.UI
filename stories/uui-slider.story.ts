import { html } from 'lit-html';
import '@umbraco-ui/uui-slider/lib/index';
import { Story } from '@storybook/web-components';
export default {
  title: 'Inputs/Slider',
  component: 'uui-slider',
  args: {
    min: -100,
    max: 100,
    step: 10,
    label: 'slider',
  },
};

export const Overview: Story = props =>
  html`
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

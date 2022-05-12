import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-color-slider',
  title: 'Color Slider',
  component: 'uui-color-slider',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-slider></uui-color-slider>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-color-slider></uui-color-slider>`;

const Template: Story = props => html`
  <uui-color-slider
    orientation=${props.orientation}
    min=${props.min}
    max=${props.max}
    .value=${props.value}></uui-color-slider>
`;

export const Vertical = Template.bind({});
Vertical.args = {
  min: 0,
  max: 100,
};
Vertical.parameters = {
  docs: {
    source: {
      code: `<uui-color-slider label="Slider label" orientation="vertical"></uui-color-slider>`,
    },
  },
};
import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

const value = '#d0021b';

export default {
  id: 'uui-color-swatch',
  title: 'Inputs/Color/Color Swatch',
  component: 'uui-color-swatch',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch></uui-color-swatch>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-color-swatch .value=${value}></uui-color-swatch>`;

const Template: Story = props => html`
  <uui-color-swatch .value=${props.value}> </uui-color-swatch>
`;

export const Transparent = Template.bind({});
Transparent.args = {
  value: 'rgba(53, 68, 177, 0.5)',
};
Transparent.parameters = {
  docs: {
    source: {
      code: `<uui-color-swatch color="rgba(53, 68, 177, 0.5)"></uui-color-slider>`,
    },
  },
};

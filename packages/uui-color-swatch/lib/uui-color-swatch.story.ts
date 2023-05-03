import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

const value = '#d0021b';

export default {
  id: 'uui-color-swatch',
  title: 'Inputs/Color/Color Swatch',
  component: 'uui-color-swatch',
};

export const Overview: Story = () =>
  html`<uui-color-swatch .value=${value} label=${value}></uui-color-swatch>`;

export const Selectable: Story = () =>
  html`<uui-color-swatch
    selectable
    .value=${value}
    label=${value}></uui-color-swatch>`;

export const InvalidValue: Story = () =>
  html`<uui-color-swatch
    .value=${'askjhsdiusyhdiudhg'}
    label="Invalid color"></uui-color-swatch>`;

export const InvalidValue2: Story = () =>
  html`<uui-color-swatch
    .value=${'askjhsdiusyhdiudhg'}
    label="Invalid color"
    show-label></uui-color-swatch>`;

export const Disabled: Story = () =>
  html`<uui-color-swatch selectable disabled label=${value}
    >${value}</uui-color-swatch
  >`;

export const DisabledSelected: Story = () =>
  html`<uui-color-swatch selectable disabled selected label=${value}
    >${value}</uui-color-swatch
  >`;

export const WithLabel: Story = () =>
  html`<uui-color-swatch
    selectable
    show-label
    label=${"This is the most beautiful color I've ever seen"}
    >${value}</uui-color-swatch
  >`;

const Template: Story = props => html`
  <uui-color-swatch
    selectable
    .value=${props.value}
    label=${value}></uui-color-swatch>
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

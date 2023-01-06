import '.';

import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { UUIColorSliderElement } from './uui-color-slider.element';

export default {
  id: 'uui-color-slider',
  title: 'Inputs/Color/Color Slider',
  component: 'uui-color-slider',
  args: {
    min: 0,
    max: 100,
    vertical: false,
    disabled: false,
    label: 'Color Slider',
    precision: 1,
    value: 0,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-slider></uui-color-slider>`,
      },
    },
  },
} as Meta<UUIColorSliderElement>;

const Template: Story<UUIColorSliderElement> = props => html`
  <uui-color-slider
    .vertical=${props.vertical}
    .min=${props.min}
    .max=${props.max}
    .precision=${props.precision}
    .label=${props.label}
    .disabled=${props.disabled}
    .value=${props.value}>
  </uui-color-slider>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 50,
};
Disabled.parameters = {
  docs: {
    source: {
      code: `<uui-color-slider label="Slider label" disabled="true"></uui-color-slider>`,
    },
  },
};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
};
Vertical.parameters = {
  docs: {
    source: {
      code: `<uui-color-slider label="Slider label" vertical="true"></uui-color-slider>`,
    },
  },
};

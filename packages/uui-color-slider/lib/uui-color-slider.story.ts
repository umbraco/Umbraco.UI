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
    type: 'hue',
    color: '',
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
    .value=${props.value}
    .type=${props.type}
    .color=${props.color}>
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

export const Opacity = Template.bind({});
Opacity.args = {
  type: 'opacity',
  color: '#417505',
};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
};

export const VerticalOpacity = Template.bind({});
VerticalOpacity.args = {
  type: 'opacity',
  vertical: true,
  color: '#417505',
};

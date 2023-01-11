import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-range-slider',
  title: 'Inputs/Range Slider',
  component: 'uui-range-slider',
  args: {
    step: 10,
    minGap: 10,
    maxGap: 0,
    valueLow: 20,
    valueHigh: 70,
    disabled: false,
    hideStepValues: false,
    label: 'range',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-range-slider></uui-range-slider>`,
      },
    },
  },
};

const Template: Story = props =>
  html`
    <uui-form-validation-message>
      <uui-range-slider
        step=${props.step}
        min-gap=${props.minGap}
        max-gap=${props.maxGap}
        min=${props.min}
        max=${props.max}
        value-low=${props.valueLow}
        value-high=${props.valueHigh}
        ?disabled=${props.disabled}
        ?hide-step-values="${props.hideStepValues}"
        label="${props.label}"></uui-range-slider>
    </uui-form-validation-message>
  `;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const HiddenValues = Template.bind({});
HiddenValues.args = {
  hideStepValues: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

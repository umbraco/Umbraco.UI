import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import readme from '../README.md?raw';

export default {
  id: 'uui-range-slider',
  title: 'Inputs/Range Slider',
  component: 'uui-range-slider',
  args: {
    step: 10,
    minGap: 10,
    maxGap: 0,
    valueLow: 0,
    valueHigh: 70,
    disabled: false,
    hideStepValues: false,
    label: 'range',
  },
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-range-slider></uui-range-slider>`,
      },
    },
  },
};

const Template: Story = props => html`
  <uui-form-validation-message>
    <uui-range-slider
      step=${ifDefined(props.step)}
      min-gap=${ifDefined(props.minGap)}
      max-gap=${ifDefined(props.maxGap)}
      min=${ifDefined(props.min)}
      max=${ifDefined(props.max)}
      value-low=${ifDefined(props.valueLow)}
      value-high=${ifDefined(props.valueHigh)}
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

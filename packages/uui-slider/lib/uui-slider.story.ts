import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Inputs/Slider',
  component: 'uui-slider',
  id: 'uui-slider',
  args: {
    min: -100,
    max: 100,
    step: 1,
    label: 'Slider label',
    hideStepValues: false,
    hideValueLabel: false,
    value: 0,
    disabled: false,
    readonly: false,
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'number' },
    },
  },
  parameters: {
    readme: { markdown: readme },
  },
};

const Template: Story = props => html`
  <uui-slider
    label=${props.label}
    step=${props.step}
    min=${props.min}
    max=${props.max}
    ?disabled=${props.disabled}
    ?readonly=${props.readonly}
    .value=${props.value}
    .hideStepValues=${props.hideStepValues}
    .hideValueLabel=${props.hideValueLabel}></uui-slider>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-slider label="Slider label" step="1"></uui-slider>`,
    },
  },
};

export const HiddenValues = Template.bind({});
HiddenValues.args = {
  hideStepValues: true,
  min: 0,
  max: 10,
  step: 1,
};
HiddenValues.parameters = {
  docs: {
    source: {
      code: `<uui-slider label="Slider label" step="100" hide-step-values></uui-slider>`,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  readonly: true,
};

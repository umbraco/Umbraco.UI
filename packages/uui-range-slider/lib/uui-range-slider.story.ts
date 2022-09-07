import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-range-slider',
  title: 'Inputs/Range Slider',
  component: 'uui-range-slider',
  args: {
    minAttr: -100,
    maxAttr: 100,
    step: 10,
    gap: 10,
    minValue: 20,
    maxValue: 70,
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
  html`<uui-range-slider
    step=${props.step}
    gap=${props.gap}
    min=${props.minAttr}
    max=${props.maxAttr}
    .minValue=${props.minValue}
    .maxValue=${props.maxValue}
    ?disabled=${props.disabled}
    ?hide-step-values="${props.hideStepValues}"
    label="${props.label}"></uui-range-slider>`;

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

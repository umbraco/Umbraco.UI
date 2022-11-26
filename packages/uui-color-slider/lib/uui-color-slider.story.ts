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

export const AAAOverview: Story = props =>
  html`<uui-color-slider></uui-color-slider>`;

AAAOverview.storyName = 'Overview';

const DisabledTemplate: Story = props => html`
  <uui-color-slider
    disabled=${props.disabled}
    .value=${props.value}>
  </uui-color-slider>
`;

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  disabled: true,
  value: 50
};
Disabled.parameters = {
  docs: {
    source: {
      code: `<uui-color-slider label="Slider label" disabled="true"></uui-color-slider>`,
    },
  },
};

const Template: Story = props => html`
  <uui-color-slider
    vertical=${props.vertical}
    min=${props.min}
    max=${props.max}
    .value=${props.value}>
  </uui-color-slider>
`;

export const Vertical = Template.bind({});
Vertical.args = {
  min: 0,
  max: 100,
  vertical: true
};
Vertical.parameters = {
  docs: {
    source: {
      code: `<uui-color-slider label="Slider label" vertical="true"></uui-color-slider>`,
    },
  },
};

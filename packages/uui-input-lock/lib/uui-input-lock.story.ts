import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-input-lock',
  title: 'Inputs/Input Lock',
  component: 'uui-input-lock',
  args: {
    value: '',
    label: 'Label',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-input-lock></uui-input-lock>`,
      },
    },
  },
};

export const AAAOverview: Story = props =>
  html`<uui-input-lock
    .disabled=${props.disabled}
    .error=${props.error}
    .label=${props.label}
    .name=${props.name}
    .placeholder=${props.placeholder}
    .value=${props.value}></uui-input-lock>`;

AAAOverview.storyName = 'Overview';

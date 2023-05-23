import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  id: 'uui-input-password',
  title: 'Inputs/Input Password',
  component: 'uui-input-password',
  args: {
    value: '',
    label: 'Label',
  },
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-input-password></uui-input-password>`,
      },
    },
  },
};

export const AAAOverview: Story = props =>
  html`<uui-input-password
    .disabled=${props.disabled}
    .error=${props.error}
    .label=${props.label}
    .name=${props.name}
    .placeholder=${props.placeholder}
    .value=${props.value}></uui-input-password>`;

AAAOverview.storyName = 'Overview';

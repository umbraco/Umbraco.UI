import '.';

import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { UUIColorAreaElement } from './uui-color-area.element';

export default {
  id: 'uui-color-area',
  title: 'Color Area',
  component: 'uui-color-area',
  argTypes: {
    value: { control: 'color' },
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-area></uui-color-area>`,
      },
    },
    actions: {
      handles: ['change'],
    },
  },
} as Meta<UUIColorAreaElement>;

const Template: Story<UUIColorAreaElement> = props =>
  html`<uui-color-area
    .value=${props.value}
    .disabled=${props.disabled}></uui-color-area>`;

export const Overview = Template.bind({});

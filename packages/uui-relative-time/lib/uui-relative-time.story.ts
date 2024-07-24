import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './uui-relative-time.element';
import type { UUIRelativeTimeElement } from './uui-relative-time.element';
import readme from '../README.md?raw';

const meta: Meta<UUIRelativeTimeElement> = {
  id: 'uui-relative-time',
  title: 'Relative Time',
  component: 'uui-relative-time',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-relative-time></uui-relative-time>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIRelativeTimeElement>;

const Template: Story = {
  render: (args: any) => html`
    <uui-relative-time datetime="${args.datetime}"
      >February 16th, 2005</uui-relative-time
    >
  `,
  argTypes: {
    datetime: { control: 'date' },
  },
};

export const Overview: Story = {
  ...Template,
  args: { datetime: '2005-02-16T16:30:00-08:00' },
};

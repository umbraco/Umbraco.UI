import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './uui-relative-time.element';
import type { UUIRelativeTimeElement } from './uui-relative-time.element';
import readme from '../README.md?raw';

const meta: Meta<UUIRelativeTimeElement> = {
  id: 'uui-relative-time',
  title: 'Displays/Relative Time',
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

const now = new Date();

const yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

const tomorrow = new Date();
tomorrow.setDate(now.getDate() + 1);

const daysAgo = new Date();
daysAgo.setDate(now.getDate() - 15);

const monthsAgo = new Date();
monthsAgo.setMonth(now.getMonth() - 3);

const format = ['duration', 'relative', 'datetime'];
const tense = ['auto', 'past', 'future'];
const precision = [
  'year',
  'month',
  'week',
  'day',
  'hour',
  'minute',
  'second',
  'millisecond',
];

export default meta;
type Story = StoryObj<UUIRelativeTimeElement>;

const Template: Story = {
  render: (args: any) => html`
    <uui-relative-time
      datetime="${args.datetime}"
      format="${args.format}"
      tense="${args.tense}"
      precision="${args.precision}"
      >February 16th, 2005</uui-relative-time
    >
  `,
  args: {
    datetime: '2005-02-16T16:30:00-08:00',
    format: 'relative',
    tense: 'auto',
    precision: 'second',
  },
  argTypes: {
    datetime: { control: 'date' },
    tense: {
      options: tense,
      control: { type: 'select' },
    },
    format: {
      options: format,
      control: { type: 'select' },
    },
    precision: {
      options: precision,
      control: { type: 'select' },
    },
  },
};

export const Overview: Story = {
  ...Template,
  args: { datetime: '2005-02-16T16:30:00-08:00' },
};

export const Yesterday: Story = {
  ...Template,
  args: {
    datetime: yesterday.toISOString(),
    format: 'relative',
    precision: 'day',
    tense: 'past',
  },
};

export const Tomorrow: Story = {
  ...Template,
  args: {
    datetime: tomorrow.toISOString(),
    format: 'relative',
    precision: 'day',
    tense: 'future',
  },
};

export const DaysAgo: Story = {
  ...Template,
  args: {
    datetime: daysAgo.toISOString(),
    format: 'relative',
    precision: 'day',
    tense: 'past',
  },
};

export const MonthsAgo: Story = {
  ...Template,
  args: {
    datetime: monthsAgo.toISOString(),
    format: 'relative',
    tense: 'past',
  },
};

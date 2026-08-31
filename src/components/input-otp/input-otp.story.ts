import './input-otp.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-input-otp',
  component: 'uui-input-otp',
  title: 'Inputs/Input Otp',
  args: {
    label: 'One-time code',
  },
  argTypes: {
    length: {
      control: { type: 'number' },
    },
  },
  render: args => html`<uui-input-otp ${spread(args)}></uui-input-otp>`,
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const IntegerOnly: Story = {
  args: {
    integerOnly: true,
  },
};

export const Masked: Story = {
  args: {
    masked: true,
  },
};

export const FourCharacters: Story = {
  args: {
    length: 4,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '------',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithError: Story = {
  args: {
    error: true,
  },
};

export const AutocompleteOneTimeCode: Story = {
  name: 'Autocomplete One-Time Code',
  args: {
    autocomplete: 'one-time-code',
  },
};

import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-textarea',
  component: 'uui-textarea',
  title: 'Inputs/Textarea',
  args: {
    label: 'Label',
  },
  argTypes: {
    '--uui-textarea-min-height': { control: { type: 'text' } },
    '--uui-textarea-max-height': { control: { type: 'text' } },
    '--uui-textarea-font-size': { control: { type: 'text' } },
    '--uui-textarea-background-color': { control: { type: 'color' } },
  },
  render: args => html`<uui-textarea ${spread(args)}></uui-textarea>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const MaxLength: Story = {
  args: {
    maxlength: 10,
  },
};

export const MinLength: Story = {
  args: {
    minlength: 5,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder...',
  },
};

/**
 * The height will confine itself within the max and min height if defined.
 */
export const AutoHeight: Story = {
  args: {
    autoHeight: true,
    '--uui-textarea-min-height': '100px',
    '--uui-textarea-max-height': '200px',
  },
};

export const Error = {
  args: {
    error: true,
  },
};

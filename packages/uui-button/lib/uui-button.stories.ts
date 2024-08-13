import './uui-button.element';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  component: 'uui-button',
  title: 'Button',
  argTypes: {
    look: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'positive', 'warning', 'danger'],
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
    },
    state: {
      options: [null, 'waiting', 'success', 'failed'],
      control: { type: 'select' },
    },
    '--uui-button-height': { control: { type: 'text' } },
    '--uui-button-border-width': { control: { type: 'text' } },
    '--uui-button-border-color': { control: { type: 'color' } },
    '--uui-button-border-radius': { control: { type: 'text' } },
    '--uui-button-font-size': { control: { type: 'text' } },
    '--uui-button-font-weight': { control: { type: 'text' } },
    '--uui-button-background-color': { control: { type: 'color' } },
    '--uui-button-background-color-hover': { control: { type: 'color' } },
    '--uui-button-border-color-hover': { control: { type: 'color' } },
    '--uui-button-contrast': { control: { type: 'color' } },
    '--uui-button-contrast-hover': { control: { type: 'color' } },
    '--uui-button-background-color-disabled': { control: { type: 'color' } },
    '--uui-button-contrast-disabled': { control: { type: 'color' } },
    '--uui-button-content-align': {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    look: 'primary',
    label: 'Button',
  },
};

export const Compact: Story = {
  args: {
    look: 'primary',
    label: 'Button',
    compact: true,
  },
};

export const Disabled: Story = {
  args: {
    look: 'primary',
    label: 'Button',
    disabled: true,
  },
};

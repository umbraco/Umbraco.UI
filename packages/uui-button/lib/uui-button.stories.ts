import { html } from 'lit';
import './uui-button.element';
import '@umbraco-ui/uui-badge/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-loader-circle/lib';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  component: 'uui-button',
  title: 'Button',
  args: {
    label: 'Button',
    look: 'primary',
  },
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
  render: args => {
    return html`<uui-button ${spread(args)}></uui-button>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const Anchor: Story = {
  args: {
    href: 'https://www.umbraco.com',
  },
};

export const Badge: Story = {
  render: args => {
    return html`<uui-button ${spread(args)}>
      <uui-badge color="danger">2</uui-badge>
      Button
    </uui-button> `;
  },
};

export const Sizing: Story = {
  args: {
    size: '20px',
  },
  render: args => {
    return html`<uui-button
      style="font-size: ${args.size}"
      ${spread(args, ['size'])}></uui-button>`;
  },
};

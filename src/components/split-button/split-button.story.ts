import './split-button.js';
import '../menu-item/menu-item.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const menuItems = ['Action 1', 'Action 2', 'Action 3'];

const renderSplitButton = (args: Record<string, unknown>) => html`
  <uui-split-button ${spread(args)}>
    <span slot="label">${args.label}</span>
    ${menuItems.map(
      item => html`<uui-menu-item label=${item}></uui-menu-item>`,
    )}
  </uui-split-button>
`;

const meta: Meta = {
  id: 'uui-split-button',
  component: 'uui-split-button',
  title: 'Buttons/Split Button',
  args: {
    label: 'Button',
    look: 'primary',
  },
  render: args => renderSplitButton(args),
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const HiddenExpand: Story = {
  args: {
    'hide-expand': true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

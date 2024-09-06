import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  id: 'uui-keyboard-shortcut',
  component: 'uui-keyboard-shortcut',
  title: 'Displays/Keyboard Shortcut',
  args: {
    label: 'Label',
  },
  render: () => html`
    <uui-keyboard-shortcut>
      <uui-key>ALT</uui-key>
      +
      <uui-key>shift</uui-key>
      +
      <uui-key>&#8593;</uui-key>
      +
      <uui-key>z</uui-key>
    </uui-keyboard-shortcut>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

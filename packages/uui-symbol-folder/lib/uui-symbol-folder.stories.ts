import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  id: 'uui-symbol-folder',
  component: 'uui-symbol-folder',
  title: 'Symbols/Folder',
  render: () => html`<uui-symbol-folder></uui-symbol-folder>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

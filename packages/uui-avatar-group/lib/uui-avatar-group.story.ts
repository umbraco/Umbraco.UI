import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-badge/lib';

const meta: Meta = {
  id: 'uui-avatar-group',
  component: 'uui-avatar-group',
  title: 'Displays/Avatar/Avatar Group',
  args: {
    '--uui-avatar-border-color': '#ffffff',
  },
  argTypes: {
    '--uui-avatar-border-color': { control: { type: 'color' } },
  },
  render: args => {
    return html`<uui-avatar-group
      style="font-size: ${args['font-size']};"
      ${spread(args)}>
      <uui-avatar name="Mads Rasmussen"></uui-avatar>
      <uui-avatar name="Niels Lyngsø"></uui-avatar>
      <uui-avatar name="Jacob Overgaard"></uui-avatar>
      <uui-avatar name="Jesper Møller Jensen"></uui-avatar>
    </uui-avatar-group>`;
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Sizing: Story = {
  args: {
    'font-size': '32px',
  },
};

export const Border: Story = {
  args: {
    '--uui-avatar-border-color': '#000000',
  },
};

export const Limit: Story = {
  args: {
    limit: 3,
  },
};

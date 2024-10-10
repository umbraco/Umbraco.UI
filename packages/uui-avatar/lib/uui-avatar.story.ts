import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-badge/lib';

const meta: Meta = {
  id: 'uui-avatar',
  component: 'uui-avatar',
  title: 'Displays/Avatar/Avatar',
  args: {
    name: 'Umbraco HQ',
  },
  render: args => {
    return html`<uui-avatar ${spread(args)}></uui-avatar>`;
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

export const Image: Story = {
  args: {
    imgSrc: 'https://i.pravatar.cc/150?img=0',
  },
};

export const Sizing: Story = {
  args: {
    'font-size': '32px',
  },
  render: args => {
    return html`<uui-avatar
      style="font-size: ${args['font-size']}"
      ${spread(args, ['font-size'])}></uui-avatar>`;
  },
};

export const Colors: Story = {
  args: {
    color: 'white',
    'background-color': 'blue',
  },
  render: args => {
    return html`<uui-avatar
      style="color: ${args.color}; background-color: ${args[
        'background-color'
      ]}"
      ${spread(args, ['color', 'background-color'])}></uui-avatar>`;
  },
};

/**
 * Slotted content might overflow, use the `overflow` attribute to hide overflow.
 */
export const SlottedContent: Story = {
  args: {
    name: '',
  },
  render: args => {
    return html`<uui-avatar ${spread(args)}>overflow</uui-avatar>`;
  },
};

export const Badge: Story = {
  render: args => {
    return html`<uui-avatar ${spread(args)}>
      <uui-badge color="danger">2</uui-badge>
    </uui-avatar> `;
  },
};

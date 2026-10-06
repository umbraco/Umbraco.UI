import './avatar-group.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

import '../badge/badge.js';
import '../avatar/avatar.js';

const names = [
  'Mads Rasmussen',
  'Niels Lyngsø',
  'Jacob Overgaard',
  'Lee Kelleher',
  'Matt Brailsford',
];

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
      ${names
        .slice(0, 4)
        .map(name => html`<uui-avatar name=${name}></uui-avatar>`)}
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

const randomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue} 65% 45%)`;
};

export const Color: Story = {
  render: args => {
    return html`<uui-avatar-group
      style="font-size: ${args['font-size']};"
      ${spread(args)}>
      ${names.map(
        name =>
          html`<uui-avatar
            name=${name}
            style="color: white; background-color: ${randomColor()}"></uui-avatar>`,
      )}
    </uui-avatar-group>`;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Image: Story = {
  render: args => {
    const imageIndexes = [0, 1, 2, 3, 4];

    return html`<uui-avatar-group
      style="font-size: ${args['font-size']};"
      ${spread(args)}>
      ${imageIndexes.map(
        index =>
          html`<uui-avatar
            name=${`Avatar ${index + 1}`}
            img-src=${`https://i.pravatar.cc/150?img=${index}`}></uui-avatar>`,
      )}
    </uui-avatar-group>`;
  },
};

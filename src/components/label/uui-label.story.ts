import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

import '../input/index.js';

const meta: Meta = {
  id: 'uui-label',
  component: 'uui-label',
  title: 'Inputs/Label',
  args: {
    slot: 'Label',
    for: 'MyInput',
  },
  render: args =>
    html`<uui-label ${spread(args)}>${renderSlots(args)}</uui-label>
      <uui-input id="MyInput" label="My A11Y Label"></uui-input>`,
  parameters: {
    readme: {
      markdown: readme,
    },
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

export const Required: Story = {
  args: {
    required: true,
  },
};

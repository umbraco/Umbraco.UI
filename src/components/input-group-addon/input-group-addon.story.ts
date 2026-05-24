import './input-group-addon.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-input-group-addon',
  component: 'uui-input-group-addon',
  title: 'Input Group Addon',
  render: args =>
    html`<uui-input-group-addon ${spread(args)}></uui-input-group-addon>`,
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

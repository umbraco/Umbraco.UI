import './input-group.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-input-group',
  component: 'uui-input-group',
  title: 'Inputs/Input Group',
  render: args => html`<uui-input-group ${spread(args)}></uui-input-group>`,
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithInput: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}
      >${renderSlots(args)}</uui-input-group
    >`,
};

export const PrependAndAppend: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}
      >${renderSlots(args)}</uui-input-group
    >`,
  args: {
    'prepend slot': html`
      <uui-input-group-addon slot="prepend"> umbraco@ </uui-input-group-addon>
    `,
    'default slot': html` <uui-input></uui-input> `,
    'append slot': html`
      <uui-input-group-addon slot="append"> .com </uui-input-group-addon>
    `,
  },
};

export const Append: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}
      >${renderSlots(args)}</uui-input-group
    >`,
};

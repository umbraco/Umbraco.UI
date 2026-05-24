import './input-group.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

import './input-group-select.example.js';

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
  args: {
    'default slot': html`<uui-input
      type="text"
      placeholder="Enter text..."></uui-input>`,
  },
};

export const WithSelect: Story = {
  render: () =>
    html`<uui-input-group-select-example></uui-input-group-select-example>`,
};

export const WithButton: Story = {
  render: args => html`
    <uui-input-group ${spread(args)}>${renderSlots(args)}</uui-input-group>
  `,
  args: {
    'append slot': html`
      <uui-button look="primary" slot="append">Search</uui-button>
    `,
    'default slot': html`<uui-input
      type="search"
      placeholder="Enter search term..."></uui-input>`,
  },
};

export const WithSwatch: Story = {
  render: args => html`
    <uui-input-group ${spread(args)}>${renderSlots(args)}</uui-input-group>
  `,
  args: {
    'prepend slot': html`
      <uui-color-swatch color="#ff0000" slot="prepend"></uui-color-swatch>
    `,
    'default slot': html`<uui-input type="text"></uui-input>`,
  },
};

export const PrependAndAppend: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}
      >${renderSlots(args)}</uui-input-group
    >`,
  args: {
    'prepend slot': html`
      <uui-input-group-addon slot="prepend">https://</uui-input-group-addon>
    `,
    'default slot': html` <uui-input></uui-input> `,
    'append slot': html`
      <uui-input-group-addon slot="append">.com</uui-input-group-addon>
    `,
  },
};

export const Append: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}
      >${renderSlots(args)}</uui-input-group
    >`,
};

import './index.js';
import '../icon/index.js';
import '../button/index.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-input',
  component: 'uui-input',
  title: 'Inputs/Input',
  render: args =>
    html`<uui-input ${spread(args)}>${renderSlots(args)}</uui-input>`,
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
  argTypes: {
    type: {
      options: [
        'text',
        'tel',
        'url',
        'email',
        'password',
        'search',
        'month',
        'week',
        'time',
        'date',
        'datetime-local',
        'number',
        'color',
      ],
    },
    inputMode: {
      options: [
        'text',
        'none',
        'decimal',
        'numeric',
        'tel',
        'search',
        'email',
        'url',
      ],
    },
  },
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const NumberInput: Story = {
  args: {
    placeholder: 'Input number',
    type: 'number',
    step: 5,
    value: '10',
    min: -50,
    max: 50,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Readonly: Story = {
  args: { readonly: true, value: 'Readonly' },
};

export const Error: Story = {
  args: { error: true, label: 'Error' },
};

export const PrependAndAppend: Story = {
  render: args =>
    html`<uui-input ${spread(args)}>${renderSlots(args)}</uui-input>

      <style>
        .extra {
          user-select: none;
          height: 100%;
          padding: 0 var(--uui-size-3);
          background: #f3f3f3;
          color: grey;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .extra:first-child {
          border-right: 1px solid
            var(--uui-input-border-color, var(--uui-color-border));
        }
        * + .extra {
          border-left: 1px solid
            var(--uui-input-border-color, var(--uui-color-border));
        }
      </style>`,
  args: {
    'prepend slot': html`<div class="extra" slot="prepend">umbraco@</div>`,
    'append slot': html` <div class="extra" slot="append">.com</div>`,
  },
};

export const PrependIcon: Story = {
  args: {
    'prepend slot': html`<uui-icon
      name="search"
      slot="prepend"
      style="padding-left:var(--uui-size-space-2)"></uui-icon>`,
  },
};

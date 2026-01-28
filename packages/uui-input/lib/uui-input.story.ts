import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-input-lock/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-button/lib';

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
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const PatternAndInputmode: Story = {
  args: {
    placeholder: 'Enter email',
    inputMode: 'email',
    pattern: '[a-zA-Z0-9_.+\\-]+@[a-zA-Z0-9\\-]+\\.[a-zA-Z0-9\\-.]+',
    errorMessage: 'Not an email',
  },
};

export const MinMaxLength: Story = {
  args: {
    minlength: 3,
    maxlength: 4,
    minlengthMessage: 'Minimum 3',
    maxlengthMessage: 'Maximum 4',
  },
};

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

export const DateTimeLocal: Story = {
  args: {
    type: 'datetime-local',
    value: '2023-04-20T10:00',
    min: '2023-04-13T10:00',
    max: '2023-04-28T16:00',
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

export const PrependIconInDiv: Story = {
  args: {
    'prepend slot': html`<div slot="prepend">
      <uui-icon name="search"></uui-icon>
    </div>`,
  },
};

export const AppendIcon: Story = {
  args: {
    'append slot': html`
      <div slot="append">
        <uui-icon name="delete"></uui-icon>
      </div>
    `,
  },
};

export const MultipleInputs: Story = {
  args: {
    'prepend slot': html`<uui-input
      slot="prepend"
      placeholder="+45"
      style="text-align: right; width: 68px;">
    </uui-input>`,
    'append slot': html`<uui-input
      slot="append"
      placeholder="(extra)"
      style="width: 100px;">
    </uui-input>`,
  },
};

export const InputAlignment: Story = {
  render: args =>
    html`<uui-input ${spread(args)}>${renderSlots(args)}</uui-input>–<uui-input
        ${spread(args)}
        >${renderSlots(args)}</uui-input
      >`,
};

export const AutoWidth: Story = {
  render: args =>
    html`<uui-input ${spread(args)}></uui-input>

      <uui-input
        ${spread(args)}
        style="max-width:240px"
        placeholder="Max-width of 240px and auto-width"></uui-input>

      <uui-input ${spread(args)}>
        <uui-input
          slot="prepend"
          placeholder="Prepend auto-width"
          ?auto-width=${args.autoWidth}></uui-input>
        <uui-input
          slot="append"
          placeholder="Append auto-width false"></uui-input>
      </uui-input>

      <uui-input
        ${spread(args)}
        style="max-width:400px"
        placeholder="max-width 400px">
        <uui-input slot="prepend" placeholder="Prepend fixed width"></uui-input>
        <uui-input
          slot="append"
          placeholder="Append auto-width false"
          ?auto-width=${args.autoWidth}></uui-input>
      </uui-input>

      <uui-input-lock placeholder="" auto-width></uui-input-lock>

      <uui-input
        ${spread(args)}
        style="width:320px"
        placeholder="Enter alias...">
        <uui-input-lock slot="append" auto-width></uui-input-lock>
      </uui-input>

      <uui-input
        ${spread(args, ['placeholder'])}
        style="--auto-width-text-margin-right: 50px"
        placeholder="--auto-width-text-margin-right: 50px"></uui-input>`,
  decorators: [
    story =>
      html`<div
        style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;">
        ${story()}
      </div>`,
  ],
  args: {
    autoWidth: true,
    placeholder: 'Start typing...',
  },
};

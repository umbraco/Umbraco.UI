import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';
import { useState } from 'storybook/preview-api';
import { repeat } from 'lit/directives/repeat.js';

const meta: Meta = {
  id: 'uui-checkbox',
  component: 'uui-checkbox',
  title: 'Inputs/Checkbox',
  argTypes: {
    labelPosition: { options: ['left', 'right', 'top', 'bottom'] },
  },
  render: args =>
    html`<uui-checkbox ${spread(args)}>${renderSlots(args)}</uui-checkbox>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};

export const ReadonlyChecked: Story = {
  args: {
    readonly: true,
    checked: true,
  },
};

export const Label: Story = {
  args: {
    label: 'Label',
  },
};

export const SlottedLabel: Story = {
  args: {
    slot: html`Using <b>Slot</b> to display label`,
  },
};

export const Indeterminate: Story = {
  render: () => {
    const fruits = ['apple', 'banana', 'mango'];
    const [value, setValue] = useState(['mango']);

    function handleParentChange(e: Event) {
      e.stopPropagation();
      const parent = e.target as HTMLInputElement;
      let values: string[] = [];
      if (parent.checked) {
        values = fruits;
      }
      setValue(values);
    }

    function handleOptionChange(e: Event) {
      e.stopPropagation();
      const option = e.target as HTMLInputElement;
      let values = value;
      if (option.checked) {
        values = values.concat(option.value);
      } else {
        values = values.filter(v => v !== option.value);
      }
      setValue(values);
    }

    // prettier-ignore
    return html`
<fieldset name="Indeterminate" style="border: none;">
  <legend>Choose your favorite fruits</legend>
  <uui-checkbox
    value="all"
    label="All fruits"
    @change=${handleParentChange}
    name="indeterminate-parent"
    ?indeterminate=${value.length > 0 && value.length < fruits.length}
    ?checked=${value.length === fruits.length}></uui-checkbox>
  <ul style="list-style: none; margin: 0;">
    ${repeat(
      fruits,
      fruit => fruit,
      fruit =>
        // prettier-ignore
        html`<li><uui-checkbox
        value=${fruit}
        label=${fruit.split('')[0].toUpperCase() + fruit.slice(1)}
        @change=${handleOptionChange}
        name="indeterminate-child"
        ?checked=${value.includes(fruit)}></uui-checkbox></li>
    `,
    )}
  </ul>
</fieldset>
    `;
  },
};

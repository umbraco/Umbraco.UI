import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-select',
  component: 'uui-select',
  title: 'Inputs/Select',
  args: {
    label: 'Favorite green',
    placeholder: 'Select an option',
    name: 'Favorite Green',
  },
  render: args => html`<uui-select ${spread(args)}></uui-select>`,
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        format: false,
        language: 'jsx',
        code: `
<uui-select placeholder="Select an option"></uui-select>

// this is an example of array you need to pass to the select component to print the options
const options: Array<Option> = [
  { name: 'Carrot', value: 'orange' },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple' },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
];
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const options: Array<Option> = [
  { name: 'Carrot', value: 'orange' },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple' },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
];

const preselectedOptions: Array<Option> = options.map(option => {
  if (option.name === 'Aubergine') return { ...option, selected: true };
  return option;
});

const groupedOptions: Array<Option> = options.map(option => {
  if (options.indexOf(option) <= 2) return { ...option, group: 'Vegetables' };
  return { ...option, group: 'Fruits' };
});

export const Default: Story = {
  args: {
    options: options,
  },
};

export const Preselected: Story = {
  args: {
    options: preselectedOptions,
    label: 'Preselected',
  },
  parameters: {
    controls: { include: ['placeholder'] },
    docs: {
      source: {
        format: false,
        language: 'jsx',
        code: `
<uui-select placeholder="Select an option"></uui-select>

//this is an example of array you need to pass to the select component to print the options
const options: Array<Option> = [
{ name: 'Carrot', value: 'orange' },
{ name: 'Cucumber', value: 'green' },
{ name: 'Aubergine', value: 'purple', selected: true },
{ name: 'Blueberry', value: 'Blue' },
{ name: 'Banana', value: 'yellow' },
{ name: 'Strawberry', value: 'red' },
];
`,
      },
    },
  },
};

export const Groups: Story = {
  args: {
    options: groupedOptions,
    label: 'Grouped',
  },
  parameters: {
    controls: { include: ['placeholder'] },
    docs: {
      source: {
        format: false,
        language: 'jsx',
        code: `
<uui-select placeholder="Select an option"></uui-select>

//this is an example of array you need to pass to the select component to print the options
const options: Array<Option> = [
{ name: 'Carrot', value: 'orange', group: 'Vegetables' },
{ name: 'Cucumber', value: 'green', group: 'Vegetables' },
{ name: 'Aubergine', value: 'purple', group: 'Vegetables' },
{ name: 'Blueberry', value: 'Blue', group: 'Fruits' },
{ name: 'Banana', value: 'yellow', group: 'Fruits' },
{ name: 'Strawberry', value: 'red', group: 'Fruits' },
];

  `,
      },
    },
  },
};

export const DisabledGroups: Story = {
  args: {
    disabledGroups: 'vegetables',
    options: groupedOptions,
    label: 'Disabled Group',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-select disabledGroups="vegetables"></uui-select>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Label',
    options: options,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-select disabled></uui-select>`,
      },
    },
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    label: 'Label',
    options: preselectedOptions,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-select readonly></uui-select>`,
      },
    },
  },
};

export const Error: Story = {
  args: {
    error: true,
    label: 'Label',
    options: options,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-select error></uui-select>`,
      },
    },
  },
};
